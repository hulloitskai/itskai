# typed: strict
# frozen_string_literal: true

class CurrentlyPlayingPoll < ApplicationService
  include Singleton

  # == Methods
  sig { void }
  def run
    value = SpotifyUser.current&.currently_playing
    CurrentlyPlaying.current = value
    if value != CurrentlyPlaying.current
      with_log_tags do
        if value.present?
          logger.info(
            "Playing: #{value.track.name} (#{value.progress_ms}ms)",
          )
        else
          logger.info("Stopped playing")
        end
      end
    end
  rescue => error
    with_log_tags { logger.error("Failed to load currently playing: #{error}") }
    Rails.error.report(error)
    Sentry.capture_exception(error)
    false
  end

  sig { void }
  def self.run = instance.run
end
