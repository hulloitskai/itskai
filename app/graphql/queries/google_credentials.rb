# typed: strict
# frozen_string_literal: true

module Queries
  class GoogleCredentials < BaseQuery
    # == Type
    type Types::OAuthCredentialsType, null: true

    # == Resolver
    sig { returns(T.nilable(OAuthCredentials)) }
    def resolve
      credentials = OAuthCredentials.google or return
      credentials if allowed_to?(:show?, credentials)
    end
  end
end
