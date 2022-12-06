# typed: strict
# frozen_string_literal: true

module Spotify
  class Streamer
    extend T::Sig

    sig { void }
    def initialize
      @task = T.let(@task, T.nilable(Concurrent::TimerTask))
    end

    # == Methods: Lifecycle
    sig { void }
    def start
      raise "Streamer already started" if @task&.running?

      @task = Concurrent::TimerTask.new(
        execution_interval: 2,
        timeout_interval: 2,
        run_now: true,
      ) do |task|
        Rails.application.reloader.wrap do
          update(previous_track: task.value)
        end
      rescue => error
        tag_logger do
          logger.error("Failed to update currently playing: #{error}")
        end
        Honeybadger.notify(error)
      end
      @task.execute
    end

    sig { void }
    def stop
      @task&.kill
    end

    # == Methods: Current Track
    sig { returns(T.nilable(RSpotify::Track)) }
    def current_track
      ActiveSupport::Dependencies.interlock.permit_concurrent_loads do
        @task&.value
      end
    end

    private

    sig do
      params(previous_track: T.nilable(RSpotify::Track))
        .returns(T.nilable(RSpotify::Track))
    end
    def update(previous_track:)
      Spotify.currently_playing.tap do |track|
        track = T.let(track, T.nilable(RSpotify::Track))
        if track&.id != previous_track&.id
          update_subscriptions(track)
        end
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
      Schema.subscriptions!.trigger(:currently_playing, {}, nil)
    end

    sig { returns(ActiveSupport::Logger) }
    def logger
      Spotify.logger
    end

    sig { params(block: T.proc.void).void }
    def tag_logger(&block)
      if logger.respond_to?(:tagged)
        logger = T.cast(self.logger, ActiveSupport::TaggedLogging)
        logger.tagged(self.class.name, &block)
      end
    end
  end
end
