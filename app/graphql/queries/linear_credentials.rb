# typed: true
# frozen_string_literal: true

module Queries
  class LinearCredentials < BaseQuery
    # == Configuration
    description "Linear OAuth credentials."

    # == Type
    type Types::OAuthCredentialsType, null: true

    # == Resolver
    sig { returns(T.nilable(OAuthCredentials)) }
    def resolve
      OAuthCredentials.linear.try! do |credentials|
        credentials = T.let(credentials, ::OAuthCredentials)
        credentials if allowed_to?(:show?, credentials)
      end
    end
  end
end
