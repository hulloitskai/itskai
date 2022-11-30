# typed: strict
# frozen_string_literal: true

module Subscriptions
  class CurrentlyPlaying < BaseSubscription
    extend T::Sig

    # == Configuration
    description "What I'm currently listening to on Spotify!"
    type Types::SpotifyTrackType, null: true
    broadcastable true

    # == Callbacks
    sig { returns(T.nilable(RSpotify::Track)) }
    def subscribe
      Spotify.streamer&.current_track
    end

    sig { returns(T.nilable(RSpotify::Track)) }
    def update
      Spotify.streamer&.current_track
    end
  end
end
