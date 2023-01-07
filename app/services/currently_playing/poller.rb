# typed: strict
# frozen_string_literal: true

class CurrentlyPlaying
  class Poller
    extend T::Sig

    # == Concerns
    include Logging

    # == Initialization
    sig { params(previous_result: T.nilable(RSpotify::Track)).void }
    def initialize(previous_result:)
      @previous_result = previous_result
    end

    # == Execution
    sig { returns(T.nilable(RSpotify::Track)) }
    def call
      Rails.error.handle do
        unless Spotify.ready?
          tag_logger { logger.warn("Spotify not ready; skipping") }
          return
        end
        if CurrentlyPlaying.debug?
          tag_logger { logger.debug("Polling") }
        end
        Spotify.currently_playing.tap do |track|
          track = T.let(track, T.nilable(RSpotify::Track))
          if track&.id != previous_result&.id
            if track.present?
              tag_logger { logger.info("Currently playing: #{track.name}") }
            else
              tag_logger { logger.info("Stopped playing") }
            end
          end
        end
      rescue => error
        tag_logger { logger.error("Error: #{error}") }
        raise "Failed to poll for currently playing track"
      end
    end

    private

    # == Helpers
    sig { returns(T.nilable(RSpotify::Track)) }
    attr_reader :previous_result
  end
end
