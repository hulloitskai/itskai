# typed: true
# frozen_string_literal: true

class CurrentlyPlayingService < ApplicationService
  class << self
    # == Service
    sig { override.returns(T::Boolean) }
    def disabled?
      return !!@disabled if defined?(@disabled)
      @disabled = T.let(@disabled, T.nilable(T::Boolean))
      @disabled = SpotifyService.disabled? || super
    end

    # == Methods
    sig { returns(T.nilable(SpotifyService::CurrentlyPlaying)) }
    def currently_playing
      instance.currently_playing if ready?
    end
  end

  # == Initialization
  sig { void }
  def initialize
    super
    @task = T.let(
      Concurrent::TimerTask.new(execution_interval: 4) do |task|
        Rails.application.reloader.wrap { poll(task:) }
      end,
      Concurrent::TimerTask,
    )
    @task.add_observer(SubscriptionsTrigger.new)
  end

  # == Service
  sig { override.returns(T::Boolean) }
  def ready?
    SpotifyService.ready? && super
  end

  sig { override.void }
  def start
    super
    @task.execute unless @task.running?
  end

  sig { override.void }
  def stop
    @task.kill if started?
  end

  # == Methods
  sig { returns(T.nilable(SpotifyService::CurrentlyPlaying)) }
  def currently_playing
    @task.value
  end

  private

  # == Methods
  sig do
    params(task: Concurrent::TimerTask)
      .returns(T.nilable(SpotifyService::CurrentlyPlaying))
  end
  def poll(task:)
    Rails.error.handle do
      unless SpotifyService.ready?
        tag_logger { logger.warn("Spotify not ready; skipping") }
        return
      end
      if debug?
        tag_logger { logger.debug("Polling") }
      end
      previous_result = T.let(
        task.value,
        T.nilable(SpotifyService::CurrentlyPlaying),
      )
      SpotifyService.retrieve_currently_playing.tap do |result|
        result = T.let(result, T.nilable(SpotifyService::CurrentlyPlaying))
        next if result == previous_result
        if result.present?
          tag_logger do
            logger.info(
              "Currently playing: #{result.track.name} " \
                "(#{result.progress_milliseconds}ms)",
            )
          end
        else
          tag_logger do
            logger.info("Stopped playing")
          end
        end
      end
    rescue => error
      tag_logger { logger.error("Error: #{error}") }
      raise "Failed to poll for currently playing track"
    end
  end
end
