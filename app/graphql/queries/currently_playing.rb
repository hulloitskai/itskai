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
      ::CurrentlyPlaying.current_track if ::CurrentlyPlaying.ready?
    end
  end
end
