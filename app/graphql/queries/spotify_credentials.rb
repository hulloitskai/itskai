# typed: strict
# frozen_string_literal: true

module Queries
  class SpotifyCredentials < BaseQuery
    extend T::Sig
    extend T::Helpers

    description "Spotify OAuth credentials."
    type Types::OAuthCredentialsType, null: true

    sig { returns(T.nilable(OAuthCredentials)) }
    def resolve
      OAuthCredentials.spotify.try! do |credentials|
        credentials = T.let(credentials, ::OAuthCredentials)
        credentials if allowed_to?(:show?, credentials)
      end
    end
  end
end
