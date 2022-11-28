# typed: strict
# frozen_string_literal: true

module Spotify
  class Streamer
    extend T::Sig

    sig { void }
    def initialize
      @current_track = T.let(@current_track, T.nilable(RSpotify::Track))
      @running_thread = T.let(
        Thread.new do
          loop do
            update
            sleep(2)
          end
        end,
        Thread,
      )
    end

    sig { void }
    def stop
      @running_thread.kill
    end

    sig { returns(T.nilable(RSpotify::Track)) }
    attr_reader :current_track

    private

    sig { void }
    def update
      track = Spotify.currently_playing
      should_update = track&.id != @current_track&.id
      @current_track = track
      update_subscriptions if should_update
    end

    sig { void }
    def update_subscriptions
      track = current_track
      if track
        tag_logger do
          logger.info("Currently playing: #{track.name}")
        end
      else
        tag_logger do
          logger.info("Stopped playing")
        end
      end
      logger.silence do
        Schema.subscriptions!.trigger(:currently_playing, {}, nil)
      end
    end

    sig { returns(ActiveSupport::Logger) }
    def logger
      Spotify.logger
    end

    sig { params(block: T.proc.void).void }
    def tag_logger(&block)
      if logger.respond_to?(:tagged)
        T.cast(logger, ActiveSupport::TaggedLogging).tagged(
          self.class.name,
          &block
        )
      end
    end
  end
end
