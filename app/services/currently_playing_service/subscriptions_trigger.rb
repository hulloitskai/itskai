# typed: strict
# frozen_string_literal: true

class CurrentlyPlayingService
  class SubscriptionsTrigger
    extend T::Sig
    include Logging

    # == Methods
    sig do
      params(
        time: Time,
        result: T.nilable(SpotifyService::CurrentlyPlaying),
        exception: T.nilable(Exception),
      ).void
    end
    def update(time, result, exception)
      if result != previous_result
        logger.silence do
          Schema.subscriptions!.trigger(:currently_playing, {}, nil)
        end
        tag_logger do
          logger.debug("Triggered subscriptions")
        end
      end
      self.previous_result = result
    end

    private

    sig { returns(T.nilable(SpotifyService::CurrentlyPlaying)) }
    attr_accessor :previous_result
  end
end
