# typed: strict
# frozen_string_literal: true

module Mutations
  class DeleteSpotifyConnection < BaseMutation
    # == Payload
    class Payload < T::Struct; end

    # == Resolver
    sig { returns(Payload) }
    def resolve
      authorize!(to: :destroy?, with: OAuthConnectionPolicy)
      credentials = OAuthCredentials.spotify or
        raise GraphQL::ExecutionError, "No existing Spotify credentials."
      credentials.destroy!
      Payload.new
    end
  end
end
