# typed: strict
# frozen_string_literal: true

module Queries
  class SpotifyConnection < BaseQuery
    # == Definition
    type Types::OAuthConnectionType, null: false

    # == Resolver
    sig { returns(OAuthConnection) }
    def resolve = OAuthConnection.spotify
  end
end
