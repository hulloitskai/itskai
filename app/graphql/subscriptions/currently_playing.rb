# typed: true
# frozen_string_literal: true

module Subscriptions
  class CurrentlyPlaying < BaseSubscription
    # == Configuration
    description "What I'm currently listening to on Spotify!"
    broadcastable true

    # == Type
    type Types::SpotifyTrackType, null: true

    # == Callbacks
    sig { returns(T.nilable(RSpotify::Track)) }
    def subscribe
      CurrentlyPlayingService.current_track
    end

    sig { returns(T.nilable(RSpotify::Track)) }
    def update
      CurrentlyPlayingService.current_track
    end
  end
end
