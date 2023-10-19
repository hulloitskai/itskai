# typed: strict
# frozen_string_literal: true

module Mutations
  class RemoveSpotifyCredentials < BaseMutation
    # == Payload
    class Payload < T::Struct; end

    # == Resolver
    sig { returns(Payload) }
    def resolve
      credentials = OAuthCredentials.spotify
      if credentials.nil?
        raise GraphQL::ExecutionError, "No existing Spotify credentials."
      end
      credentials.destroy!
      Payload.new
    end
  end
end
