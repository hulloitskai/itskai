# typed: strict
# frozen_string_literal: true

module Queries
  class LinearCredentials < BaseQuery
    extend T::Sig
    extend T::Helpers

    description "Linear OAuth credentials."
    type Types::OAuthCredentialsType, null: true

    sig { returns(T.nilable(OAuthCredentials)) }
    def resolve
      OAuthCredentials.linear.try! do |credentials|
        credentials = T.let(credentials, ::OAuthCredentials)
        credentials if allowed_to?(:show?, credentials)
      end
    end
  end
end
