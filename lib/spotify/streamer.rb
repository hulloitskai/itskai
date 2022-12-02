# typed: strict
# frozen_string_literal: true

module Spotify
  class Streamer
    extend T::Sig

    sig { void }
    def initialize
      @current_track = T.let(@current_track, T.nilable(RSpotify::Track))
      @current_track_mutex = T.let(Thread::Mutex.new, Thread::Mutex)
      @running_thread = T.let(@running_thread, T.nilable(Thread))
    end

    # == Methods: Lifecycle
    sig { void }
    def start
      Thread.new do
        loop do
          update
          sleep(2)
        rescue => error
          tag_logger do
            logger.error("Failed to update currently playing: #{error}")
          end
          Honeybadger.notify(error)
        end
      end
    end

    sig { void }
    def stop
      @running_thread&.kill
    end

    # == Methods: Current Track
    sig { returns(T.nilable(RSpotify::Track)) }
    def current_track
      @current_track_mutex.synchronize do
        @current_track
      end
    end

    private

    sig { void }
    def update
      track = Spotify.currently_playing
      if @current_track_mutex.synchronize do
        if track&.id != @current_track&.id
          @current_track = track
          true
        else
          false
        end
      end
        update_subscriptions(track)
      end
    end

    sig { params(track: T.nilable(RSpotify::Track)).void }
    def update_subscriptions(track)
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
