# typed: true
# frozen_string_literal: true

module Mutations
  class SpotifyCredentialsRemove < BaseMutation
    # == Payload
    class Payload < T::Struct; end

    # == Resolver
    sig { override.returns(Payload) }
    def resolve
      credentials = OAuthCredentials.spotify
      if credentials.nil?
        raise GraphQL::ExecutionError, "No existing Spotify credentials."
      end
      credentials.destroy!
      SpotifyService.restart
      Payload.new
    end
  end
end
