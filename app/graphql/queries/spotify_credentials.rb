# typed: true
# frozen_string_literal: true

module Queries
  class SpotifyCredentials < BaseQuery
    # == Type
    type Types::OAuthCredentialsType, null: true

    # == Resolver
    sig { returns(T.nilable(OAuthCredentials)) }
    def resolve
      if (credentials = OAuthCredentials.spotify)
        credentials if allowed_to?(:show?, credentials)
      end
    end
  end
end
