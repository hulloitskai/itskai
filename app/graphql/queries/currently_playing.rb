# typed: true
# frozen_string_literal: true

module Queries
  class CurrentlyPlaying < BaseQuery
    # == Configuration
    description "What I'm currently listening to on Spotify!"

    # == Type
    type Types::SpotifyTrackType, null: true

    # == Resolver
    sig { returns(T.nilable(RSpotify::Track)) }
    def resolve
      CurrentlyPlayingService.current_track
    end
  end
end
