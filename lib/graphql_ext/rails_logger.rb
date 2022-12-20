# typed: strict
# frozen_string_literal: true

require "graphql"
require "rails"

module GraphQL::RailsLogger
  class Subscriber < ActionController::LogSubscriber
    extend T::Sig

    # Change log formatting to omit initial newline.
    sig { params(event: T.untyped).void }
    def start_processing(event)
      return unless logger.info?

      payload = event.payload
      params = payload[:params].except(*INTERNAL_PARAMS)
      format = payload[:format]
      format = format.to_s.upcase if format.is_a?(Symbol)
      format = "*/*" if format.nil?

      payload => { controller:, action: }
      info("#{controller}##{action} is processing as #{format}")

      config = GraphQL::RailsLogger.configuration
      if config.white_list.fetch(controller, []).include?(action)
        formatter = Rouge::Formatters::Terminal256.new(config.theme)
        lexer_gql = Rouge::Lexers::GraphQL.new
        lexer_rb = Rouge::Lexers::Ruby.new

        # Cleanup and indent params for logging.
        query = indent(params.fetch("query", ""))
        variables = indent(pretty(params.fetch("variables", "")))
        extensions = indent(pretty(params.fetch("extensions", "")))

        # Skip introspection query, if applicable.
        if config.skip_introspection_query &&
            query.index(/query IntrospectionQuery/)
          query = "    query IntrospectionQuery { ... }"
        end

        if query.present?
          info("  Query:")
          info(formatter.format(lexer_gql.lex(query)))
        end
        if variables.present?
          info("  Variables:")
          info(formatter.format(lexer_rb.lex(variables)))
        end
        if extensions.present?
          info("  Extensions:")
          info(formatter.format(lexer_rb.lex(extensions)))
        end
      else
        info("  Parameters: #{params.inspect}") unless params.empty?
      end
    end

    sig { params(data: T.untyped).returns(T.untyped) }
    def indent(data)
      data.lines.map { |line| "    #{line}" }.join.chomp
    end

    sig { params(data: T.untyped).returns(T.untyped) }
    def pretty(data)
      return "" if data.blank?

      data = JSON.parse(data) if data.is_a?(String)
      PP.pp(data, +"")
    end
  end
end
