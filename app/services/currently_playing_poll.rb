# typed: strict
# frozen_string_literal: true

class CurrentlyPlayingPoll < ApplicationService
  include Singleton

  # == Methods
  sig { returns(T::Boolean) }
  def run
    value = SpotifyUser.current&.currently_playing
    if value != CurrentlyPlaying.current
      CurrentlyPlaying.current = value
      with_log_tags do
        if value.present?
          logger.info(
            "Playing: #{value.track.name} (#{value.progress_ms}ms)",
          )
        else
          logger.info("Stopped playing")
        end
      end
      true
    else
      false
    end
  rescue => error
    with_log_tags { logger.error("Failed to load currently playing: #{error}") }
    Rails.error.report(error)
    false
  end

  sig { returns(T::Boolean) }
  def self.run = instance.run
end
