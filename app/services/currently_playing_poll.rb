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
      tag_logger do
        if value.present?
          tag_logger do
            logger.info(
              "Playing: #{value.track.name} (#{value.progress_milliseconds}ms)",
            )
          end
        else
          tag_logger { logger.info("Stopped playing") }
        end
      end
      true
    else
      false
    end
  rescue => error
    tag_logger { logger.error("Error: #{error}") }
    Rails.error.report(error, handled: true)
    false
  end

  sig { returns(T::Boolean) }
  def self.run = instance.run
end
