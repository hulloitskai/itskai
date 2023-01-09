# typed: strict
# frozen_string_literal: true

class Linear
  Adapter = T.let(
    GraphQL::Client::HTTP.new("https://api.linear.app/graphql") do
      # rubocop:disable Style/MethodCallWithArgsParentheses
      T.bind(self, T.class_of(GraphQL::Client::HTTP))

      extend T::Sig

      sig { params(context: T.untyped).returns(T::Hash[String, String]) }
      def headers(context)
        token = Linear.credentials.access_token
        { "Authorization" => "Bearer #{token}" }
      end

      # rubocop:enable Style/MethodCallWithArgsParentheses
    end,
    GraphQL::Client::HTTP,
  )
end
