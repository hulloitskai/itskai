# typed: strict
# frozen_string_literal: true

module Spotify
  class Streamer
    class CurrentlyPlayingSubscriptionTrigger
      extend T::Sig

      sig { void }
      def initialize
        @previous_result = T.let(@previous_result, T.nilable(RSpotify::Track))
      end

      sig do
        params(
          time: Time,
          result: T.nilable(RSpotify::Track),
          exception: T.nilable(Exception),
        ).void
      end
      def update(time, result, exception)
        if result&.id != previous_result&.id
          Schema.subscriptions!.trigger(:currently_playing, {}, nil)
        end
        self.previous_result = result
      end

      private

      sig { returns(T.nilable(RSpotify::Track)) }
      attr_accessor :previous_result
    end
  end
end
