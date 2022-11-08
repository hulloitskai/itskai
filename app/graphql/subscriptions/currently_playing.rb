# typed: strict
# frozen_string_literal: true

module Subscriptions
  class CurrentlyPlaying < BaseSubscription
    extend T::Sig

    # == Configuration ==
    type Types::SpotifyTrackType, null: true
    broadcastable true

    # == Callbacks ==
    sig { returns(T.nilable(RSpotify::Track)) }
    def subscribe
      CurrentlyPlayingWorker.current_track
    end
  end
end
