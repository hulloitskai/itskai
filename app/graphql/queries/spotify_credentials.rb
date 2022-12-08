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
      OAuthCredentials.spotify.try! do |provider|
        provider = T.let(provider, ::OAuthCredentials)
        provider if allowed_to?(:show?, provider)
      end
    end
  end
end
