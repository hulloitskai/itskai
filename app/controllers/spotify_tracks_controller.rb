# typed: true
# frozen_string_literal: true

class SpotifyTracksController < ApplicationController
  # == Filters
  before_action :set_track_id

  # == Actions
  # GET /spotify/tracks/1/lyrics
  def lyrics
    begin
      track_id = @track_id or raise "Missing track ID"
      lyrics = SpotifyClient.retrieve_lyrics(track_id)
    rescue => error
      with_log_tags do
        logger.error("Failed to retrieve lyrics: #{error.message}")
      end
      raise
    end
    if lyrics
      render(json: { lyrics: LyricLineSerializer.many(lyrics) })
    else
      render(json: { lyrics: [] })
    end
  end

  private

  # == Filter handlers
  def set_track_id
    @track_id = T.let(params.fetch(:spotify_track_id), T.nilable(String))
  end
end
