# typed: true
# frozen_string_literal: true

module Subscriptions
  class CurrentlyPlaying < BaseSubscription
    # == Configuration
    description "What I'm currently listening to on Spotify!"
    broadcastable true

    # == Type
    type Types::SpotifyCurrentlyPlayingType, null: true

    # == Callbacks
    sig { returns(T.nilable(SpotifyService::CurrentlyPlaying)) }
    def subscribe
      CurrentlyPlayingService.currently_playing
    end

    sig { returns(T.nilable(SpotifyService::CurrentlyPlaying)) }
    def update
      CurrentlyPlayingService.currently_playing
    end
  end
end
