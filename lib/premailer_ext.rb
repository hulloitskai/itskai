# typed: true
# frozen_string_literal: true

require "premailer/rails"
require "nokogiri"
require "sorbet-runtime"

class Premailer
  module Adapter::Nokogiri
    extend T::Sig
    extend T::Helpers
    include AdapterHelper::RgbToHex

    # == Types
    CssVariables = T.type_alias { T::Hash[String, T.untyped] }

    # == Annotations
    requires_ancestor { Premailer }

    # Merge CSS into the HTML document.
    #
    # @return [String] an HTML.
    sig { returns(String) }
    def to_inline_css
      doc = T.let(@processed_doc, Nokogiri::HTML::Document)
      element_variables = T.let(
        {},
        T::Hash[Nokogiri::XML::Element, CssVariables],
      )
      unmergable_rules = CssParser::Parser.new

      # Give all styles already in style attributes a specificity of 1000
      # per http://www.w3.org/TR/CSS21/cascade.html#specificity
      doc.search("*[@style]").each do |el|
        el["style"] = "[SPEC=1000[" + el.attributes["style"] + "]]"
      end

      # Iterate through the rules and merge them into the HTML
      @css_parser.each_selector(:all) do
        |selector, declaration, specificity, media_types|
        # Save un-mergable rules separately
        selector.gsub!(/:link([\s]*)+/i) { |_m| ::Regexp.last_match(1) }

        # Convert element names to lower case
        selector.gsub!(/([\s]|^)([\w]+)/) do |_m|
          ::Regexp.last_match(1).to_s + ::Regexp.last_match(2).to_s.downcase
        end

        if Premailer.is_media_query?(media_types) ||
            selector =~ Premailer::RE_UNMERGABLE_SELECTORS
          rules = CssParser::RuleSet.new(selector, declaration)
          unless @options[:preserve_styles]
            unmergable_rules.add_rule_set!(rules, media_types)
          end
        else
          begin
            if Premailer::RE_RESET_SELECTORS.match?(selector)
              # this is in place to preserve the MailChimp CSS reset: http://github.com/mailchimp/Email-Blueprints/
              # however, this doesn't mean for testing pur
              rules = CssParser::RuleSet.new(selector, declaration)
              unmergable_rules.add_rule_set!(rules) if @options[:preserve_reset]
            end

            # Change single ID CSS selectors into xpath so that we can match
            # more than one element.
            #
            # Added to work around dodgy generated code.
            selector.gsub!(/\A\#([\w_\-]+)\Z/, '*[@id=\1]')

            doc.search(selector).each do |el|
              next unless el.elem? &&
                ((el.name != "head") && (el.parent.name != "head"))
              # Add a style attribute or append to the existing one
              block = "[SPEC=#{specificity}[#{declaration}]]"
              el["style"] = (el.attributes["style"].to_s ||= "") + " " + block
            end
          rescue ::Nokogiri::SyntaxError, RuntimeError, ArgumentError
            if @options[:verbose]
              $stderr.puts "CSS syntax error with selector: #{selector}"
            end
            next
          end
        end
      end

      # Parse CSS variable declarations from unmergeable rules
      unmergable_rules.each_selector(:all) do |selector, declarations|
        next if selector.match?(RE_UNMERGABLE_SELECTORS)
        suppress(Nokogiri::SyntaxError) do
          doc.search(selector).each do |el|
            rules = CssParser::RuleSet.new(nil, declarations)
            css_variables = T.let({}, CssVariables)
            rules.each_declaration do |property, value, important|
              next unless property.start_with?("--")
              if important
                css_variables[property] = value
              else
                css_variables[property] ||= value
              end
            end
            element_variables[el] = css_variables
            css_variables.keys.each do |property|
              unmergable_rules.each_rule_set do |rules|
                rules = T.let(rules, CssParser::RuleSet)
                rules.delete(property)
              end
            end
          end
        end
      end

      # Remove script tags
      doc.search("script").remove if @options[:remove_scripts]

      # Read STYLE attributes and perform folding
      doc.search("*[@style]").each do |el|
        style = el.attributes["style"].to_s

        declarations = []
        style.scan(/\[SPEC\=([\d]+)\[(.[^\]\]]*)\]\]/).each do |declaration|
          rules = CssParser::RuleSet.new(
            nil,
            declaration[1].to_s,
            declaration[0].to_i,
          )
          declarations << rules
        rescue ArgumentError => e
          raise e if @options[:rule_set_exceptions]
        end

        # Perform style folding
        rules = T.let(CssParser.merge(declarations), CssParser::RuleSet)
        begin
          rules.expand_shorthand!
        rescue ArgumentError => e
          raise e if @options[:rule_set_exceptions]
        end

        # Parse CSS variable declarations
        css_variables = T.let({}, CssVariables)
        rules.each_declaration do |property, value, important|
          next unless property.start_with?("--")
          if important
            css_variables[property] = value
          else
            css_variables[property] ||= value
          end
        end
        element_variables[el] = css_variables
        css_variables.keys.each { |property| rules.delete(property) }

        # Replace CSS variable references
        # merged.each_declaration do |property, value,|
        #   merged[property] = resolve_css_variables(value)
        # end

        # Collapse multiple rules into one as much as possible.
        rules.create_shorthand! if @options[:create_shorthands]

        # Write the inline STYLE attribute
        el["style"] = rules.declarations_to_s
      end

      # Write unmergeable rules
      unless @options[:drop_unmergeable_css_rules]
        write_unmergable_css_rules(doc, unmergable_rules)
      end

      # Inline CSS variables and duplicate CSS attributes as HTML attributes
      doc.search("*[@style]").each do |el|
        style = el.attributes["style"].to_s
        rules = CssParser::RuleSet.new(nil, style)
        rules.each_declaration do |property, value,|
          rules[property] = resolve_css_value(
            value,
            el,
            element_variables,
          )
        end

        # Duplicate CSS attributes as HTML attributes
        if Premailer::RELATED_ATTRIBUTES.key?(el.name) &&
            @options[:css_to_attributes]
          Premailer::RELATED_ATTRIBUTES[el.name].each do |css_attr, html_attr|
            if el[html_attr].nil? && !rules[css_attr].empty?
              new_val = rules[css_attr].dup

              # Remove url() function wrapper
              new_val.gsub!(/url\((['"])(.*?)\1\)/, '\2')

              # Remove !important, trailing semi-colon, and leading/trailing
              # whitespace
              new_val.gsub!(/;$|\s*!important/, "").strip!

              # For width and height tags, remove px units
              if %w[width height].include?(html_attr) # rubocop:disable Performance/CollectionLiteralInLoop
                new_val.gsub!(/(\d+)px/, '\1')
              end

              # For color-related tags, convert RGB to hex if specified by
              # options
              new_val = ensure_hex(new_val) if css_attr.end_with?("color") &&
                @options[:rgb_to_hex_attributes]

              el[html_attr] = new_val
            end

            next if @options[:preserve_style_attribute]
            rules.instance_variable_get(:@declarations).tap do |declarations|
              declarations.delete(css_attr)
            end
          end
        end

        el["style"] = rules.declarations_to_s
      end

      if @options[:remove_classes] || @options[:remove_comments]
        doc.traverse do |el|
          if el.comment? && @options[:remove_comments]
            el.remove
          elsif el.element?
            el.remove_attribute("class") if @options[:remove_classes]
          end
        end
      end

      if @options[:remove_ids]
        # find all anchor's targets and hash them
        targets = []
        doc.search("a[@href^='#']").each do |el|
          target = el.get_attribute("href")[1..-1]
          targets << target
          el.set_attribute("href", "#" + Digest::SHA256.hexdigest(target))
        end
        # hash ids that are links target, delete others
        doc.search("*[@id]").each do |el|
          id = el.get_attribute("id")
          if targets.include?(id)
            el.set_attribute("id", Digest::SHA256.hexdigest(id))
          else
            el.remove_attribute("id")
          end
        end
      end

      if @options[:reset_contenteditable]
        doc.search("*[@contenteditable]").each do |el|
          el.remove_attribute("contenteditable")
        end
      end

      @processed_doc = doc
      if is_xhtml?
        # we don't want to encode carriage returns
        @processed_doc.to_xhtml(encoding: @options[:output_encoding]).gsub(
          /&\#(xD|13);/i, "\r"
        )
      else
        @processed_doc.to_html(encoding: @options[:output_encoding])
      end
    end

    sig do
      params(
        value: String,
        el: Nokogiri::XML::Element,
        element_variables: T::Hash[Nokogiri::XML::Element, CssVariables],
      ).returns(String)
    end
    def resolve_css_value(value, el, element_variables)
      new_value = T.let(value.dup, String)
      while (match = new_value.match(/var\((--[\w-]+)(, ?(.+))?\)/))
        variable_name, fallback_literal, fallback = T.cast(
          match.captures,
          [String, T.nilable(String), T.nilable(String)],
        )
        replacement = resolve_css_variable(
          variable_name,
          el,
          element_variables,
        ) || fallback
        break unless replacement
        reference = if fallback_literal
          "var(#{variable_name + fallback_literal})"
        else
          "var(#{variable_name})"
        end
        new_value = new_value.gsub(reference, replacement)
      end
      new_value
    end

    sig do
      params(
        name: String,
        el: Nokogiri::XML::Element,
        element_variables: T::Hash[Nokogiri::XML::Element, CssVariables],
      ).returns(T.nilable(String))
    end
    def resolve_css_variable(name, el, element_variables)
      node = T.let(el, Nokogiri::XML::Element)
      until node.is_a?(Nokogiri::HTML4::Document)
        css_variables = element_variables[node] || {}
        if (replacement = css_variables[name])
          return replacement
        end
        node = node.parent
      end
    end

    # Create a <tt>style</tt> element with un-mergable rules
    # (e.g. <tt>:hover</tt>) and write it into the <tt>head</tt>.
    #
    # <tt>doc</tt> is an Nokogiri document and <tt>unmergeable_css_rules</tt> is
    # a Css::RuleSet.
    #
    # @return [::Nokogiri::XML] a document.
    def write_unmergable_css_rules(doc, unmergable_rules) # :nodoc:
      styles = unmergable_rules.to_s
      unless styles.empty?
        if @options[:html_fragment]
          style_tag = ::Nokogiri::XML::Node.new("style", doc)
          style_tag.content = styles
          doc.add_child(style_tag)
        else
          style_tag = doc.create_element("style", styles.to_s)
          head = doc.at_css("head")
          if doc.root&.first_element_child
            head ||= doc.root.first_element_child.add_previous_sibling(
              doc.create_element("head"),
            )
          end
          head ||= doc.add_child(doc.create_element("head"))
          head << style_tag
        end
      end
      doc
    end

    # Converts the HTML document to a format suitable for plain-text e-mail.
    #
    # If present, uses the <body> element as its base; otherwise uses the whole
    # document.
    #
    # @return [String] a plain text.
    def to_plain_text
      html_src = ""
      begin
        html_src = @doc.at("body").inner_html
      rescue # rubocop:disable Lint/SuppressedException
      end

      html_src = @doc.to_html if html_src.blank?
      convert_to_text(html_src, @options[:line_length], @html_encoding)
    end

    # Gets the original HTML as a string.
    # @return [String] HTML.
    def to_s
      if is_xhtml?
        @doc.to_xhtml(encoding: nil)
      else
        @doc.to_html(encoding: nil)
      end
    end

    # Load the HTML file and convert it into an Nokogiri document.
    #
    # @return [::Nokogiri::XML] a document.
    def load_html(input) # :nodoc:
      thing = nil

      # TODO: duplicate options
      if @options[:with_html_string] || @options[:inline] ||
          input.respond_to?(:read)
        thing = input
      elsif @is_local_file
        @base_dir = File.dirname(input)
        thing = File.open(input, "r")
      else
        thing = URI.open(input) # rubocop:disable Security/Open
      end
      thing = thing.read if thing.respond_to?(:read)

      return unless thing
      doc = nil

      # Handle HTML entities
      if (@options[:replace_html_entities] == true) && thing.is_a?(String)
        HTML_ENTITIES.map do |entity, replacement|
          thing.gsub!(entity, replacement)
        end
      end
      encoding = @options[:input_encoding] ||
        (RUBY_PLATFORM == "java" ? nil : "BINARY")
      doc = if @options[:html_fragment]
        ::Nokogiri::HTML.fragment(thing, encoding)
      else
        ::Nokogiri::HTML(thing, nil, encoding, &:recover)
      end

      # Fix for removing any CDATA tags from both style and script tags inserted
      # per
      # https://github.com/sparklemotion/nokogiri/issues/311 and
      # https://github.com/premailer/premailer/issues/199
      %w(style script).each do |tag|
        doc.search(tag).children.each do |child|
          child.swap(child.text) if child.cdata?
        end
      end

      doc
    end
  end
end
