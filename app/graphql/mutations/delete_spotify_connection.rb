# typed: strict
# frozen_string_literal: true

module Mutations
  class DeleteSpotifyConnection < BaseMutation
    # == Resolver
    sig { returns({}) }
    def resolve
      authorize!(to: :destroy?, with: OAuthConnectionPolicy)
      credentials = OAuthCredentials.spotify or
        raise GraphQL::ExecutionError, "No existing Spotify credentials."
      credentials.destroy!
      {}
    end
  end
end
