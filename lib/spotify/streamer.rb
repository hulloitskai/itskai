# typed: strict
# frozen_string_literal: true

require_relative "streamer/observer"

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
          previous_track = T.let(task.value, T.nilable(RSpotify::Track))
          update(previous_track:)
        end
      rescue => error
        tag_logger do
          logger.error("Failed to update currently playing: #{error}")
        end
        Honeybadger.notify(error)
      end
      @task.add_observer(CurrentlyPlayingSubscriptionTrigger.new)
      @task.execute
    end

    sig { void }
    def stop
      @task.try! do |task|
        task = T.let(task, Concurrent::TimerTask)
        task.delete_observers
        task.kill
      end
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
          if track
            tag_logger do
              logger.info("Currently playing: #{track.name}")
            end
          else
            tag_logger do
              logger.info("Stopped playing")
            end
          end
        end
      end
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
