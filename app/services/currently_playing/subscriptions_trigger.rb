# typed: strict
# frozen_string_literal: true

class CurrentlyPlaying
  class SubscriptionsTrigger
    extend T::Sig
    include Logging

    # == Initialization
    sig { void }
    def initialize
      @previous_result = T.let(@previous_result, T.nilable(RSpotify::Track))
    end

    # == Methods
    sig do
      params(
        time: Time,
        result: T.nilable(RSpotify::Track),
        exception: T.nilable(Exception),
      ).void
    end
    def update(time, result, exception)
      if result&.id != previous_result&.id
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

    sig { returns(T.nilable(RSpotify::Track)) }
    attr_accessor :previous_result
  end
end
