# typed: strict
# frozen_string_literal: true

require "premailer"
require "nokogiri"
require "css_parser"
require "css_parser_ext"
require "sorbet-runtime"

module Premailer::Adapter::Nokogiri
  # Add support for CSS variables.
  module Patch
    extend T::Sig
    extend T::Helpers

    # == Aliases
    CssVariables = T.type_alias { T::Hash[String, T.untyped] }

    # == Annotations
    requires_ancestor { Premailer }
    requires_ancestor { Premailer::Adapter::Nokogiri }

    # == Initializer
    sig { params(args: T.untyped, kwargs: T.untyped).void }
    def initialize(*args, **kwargs)
      super
      @processed_doc = T.let(@processed_doc, Nokogiri::XML::Document)
      @css_parser = T.let(@css_parser, CssParser::Parser)
      @options = T.let(@options, T::Hash[Symbol, T.untyped])
    end

    # == Methods
    # Merge CSS into the HTML document.
    sig { returns(String) }
    def to_inline_css
      unmergeable_rules = CssParser::Parser.new

      # Give all styles already in style attributes a specificity of 1000
      # per http://www.w3.org/TR/CSS21/cascade.html#specificity
      @processed_doc.search("*[@style]").each do |el|
        el["style"] = "[SPEC=1000[" + el.attributes["style"] + "]]"
      end

      # Iterate through the rules and merge them into the HTML
      @css_parser.each_selector(:all) do
        |selector, declaration, specificity, media_types|
        # Save un-mergable rules separately
        selector.gsub!(/:link([\s]*)+/i) { Regexp.last_match(1) }

        # Convert element names to lower case
        selector.gsub!(/([\s]|^)([\w]+)/) do
          Regexp.last_match(1).to_s + Regexp.last_match(2).to_s.downcase
        end

        if Premailer.is_media_query?(media_types) ||
            selector =~ Premailer::RE_UNMERGABLE_SELECTORS
          rules = CssParser::RuleSet.new(selector, declaration)
          unless @options[:preserve_styles]
            unmergeable_rules.add_rule_set!(rules, media_types)
          end
        else
          begin
            if Premailer::RE_RESET_SELECTORS.match?(selector)
              # This is in place to preserve the MailChimp CSS reset:
              # http://github.com/mailchimp/Email-Blueprints/
              #
              # however, this doesn't mean for testing pur
              rules = CssParser::RuleSet.new(selector, declaration)
              if @options[:preserve_reset]
                unmergeable_rules.add_rule_set!(rules)
              end
            end

            # Change single ID CSS selectors into xpath so that we can match
            # more than one element.
            #
            # Added to work around dodgy generated code.
            selector.gsub!(/\A\#([\w_\-]+)\Z/, '*[@id=\1]')

            @processed_doc.search(selector).each do |el|
              next unless el.elem? &&
                ((el.name != "head") && (el.parent.name != "head"))
              # Add a style attribute or append to the existing one
              block = "[SPEC=#{specificity}[#{declaration}]]"
              el["style"] = (el.attributes["style"].to_s ||= "") + " " + block
            end
          rescue Nokogiri::SyntaxError, RuntimeError, ArgumentError
            if @options[:verbose]
              $stderr.puts "CSS syntax error with selector: #{selector}"
            end
            next
          end
        end
      end

      # Parse CSS variable declarations from unmergeable rules
      unmergeable_rules.each_selector(:all) do |selector, declarations|
        next if selector.match?(Premailer::RE_UNMERGABLE_SELECTORS)
        suppress(Nokogiri::SyntaxError) do
          @processed_doc.search(selector).each do |el|
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
            element_css_variables[el] = css_variables
            css_variables.keys.each do |property|
              unmergeable_rules.each_rule_set do |rules|
                rules = T.let(rules, CssParser::RuleSet)
                rules.delete(property)
              end
            end
          end
        end
      end

      # Remove script tags
      @processed_doc.search("script").remove if @options[:remove_scripts]

      # Read STYLE attributes and perform folding
      @processed_doc.search("*[@style]").each do |element|
        style = element.attributes["style"].to_s
        declarations = T.let([], T::Array[CssParser::RuleSet])
        style.scan(/\[SPEC\=([\d]+)\[(.[^\]\]]*)\]\]/).each do |declaration|
          specificity, block = declaration
          rules = CssParser::RuleSet.new(nil, block.to_s, specificity.to_i)
          declarations << rules
        rescue ArgumentError => e
          raise e if @options[:rule_set_exceptions]
        end

        # Parse CSS variable declarations
        css_variables = T.let({}, CssVariables)
        CssParser.merge(declarations).each_declaration do
          |property, value, is_important|
          next unless property.start_with?("--")
          if is_important
            css_variables[property] = value
          else
            css_variables[property] ||= value
          end
        end
        element_css_variables[element] = css_variables

        # Resolve CSS variable references
        declarations.each do |rules|
          rules.each_declaration do |property, value, is_important|
            if property.start_with?("--")
              rules.delete(property)
            else
              value = resolve_css_value(value, element)
              value = [value, "!important"].join(" ") if is_important
              rules[property] = value
            end
          end
        end

        # Perform style folding
        rules = T.let(CssParser.merge(declarations), CssParser::RuleSet)
        begin
          rules.expand_shorthand!
        rescue ArgumentError => e
          raise e if @options[:rule_set_exceptions]
        end

        # Collapse multiple rules into one as much as possible
        rules.create_shorthand! if @options[:create_shorthands]

        # Write the inline STYLE attribute
        element["style"] = rules.declarations_to_s
      end

      # Write unmergeable rules
      unless @options[:drop_unmergeable_css_rules]
        write_unmergable_css_rules(@processed_doc, unmergeable_rules)
      end

      # Inline CSS variables and duplicate CSS attributes as HTML attributes
      @processed_doc.search("*[@style]").each do |el|
        style = el.attributes["style"].to_s
        rules = CssParser::RuleSet.new(nil, style)

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
        @processed_doc.traverse do |el|
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
        @processed_doc.search("a[@href^='#']").each do |el|
          target = el.get_attribute("href")[1..-1]
          targets << target
          el.set_attribute("href", "#" + Digest::SHA256.hexdigest(target))
        end
        # hash ids that are links target, delete others
        @processed_doc.search("*[@id]").each do |el|
          id = el.get_attribute("id")
          if targets.include?(id)
            el.set_attribute("id", Digest::SHA256.hexdigest(id))
          else
            el.remove_attribute("id")
          end
        end
      end

      if @options[:reset_contenteditable]
        @processed_doc.search("*[@contenteditable]").each do |el|
          el.remove_attribute("contenteditable")
        end
      end

      if is_xhtml?
        # we don't want to encode carriage returns
        @processed_doc.to_xhtml(encoding: @options[:output_encoding]).gsub(
          /&\#(xD|13);/i, "\r"
        )
      else
        @processed_doc.to_html(encoding: @options[:output_encoding])
      end
    end

    private

    sig { returns(T::Hash[Nokogiri::XML::Element, T::Hash[String, T.untyped]]) }
    def element_css_variables
      @element_css_variables ||= T.let(
        {},
        T.nilable(T::Hash[Nokogiri::XML::Element, CssVariables]),
      )
    end

    # Resolve a CSS value that may contain CSS variables.
    sig do
      params(value: String, element: ::Nokogiri::XML::Element).returns(String)
    end
    def resolve_css_value(value, element)
      new_value = T.let(value.dup, String)
      while (match = new_value.match(/var\((--[\w-]+)(, ?(.+))?\)/))
        variable_name, fallback_literal, fallback = T.cast(
          match.captures,
          [String, T.nilable(String), T.nilable(String)],
        )
        replacement = lookup_css_variable_value(
          variable_name,
          element,
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

    # Looks up the value of a CSS variable.
    sig do
      params(
        name: String,
        element: Nokogiri::XML::Element,
      ).returns(T.nilable(String))
    end
    def lookup_css_variable_value(name, element)
      node = T.let(element, Nokogiri::XML::Element)
      until node.is_a?(Nokogiri::HTML4::Document)
        css_variables = element_css_variables[node] || {}
        if (replacement = css_variables[name])
          return replacement
        end
        node = node.parent
      end
    end
  end
  prepend Patch
end
