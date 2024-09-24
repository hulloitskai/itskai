# typed: true
# frozen_string_literal: true

class SpotifyTracksController < ApplicationController
  # == Actions
  # GET /spotify/tracks/:spotify_track_id/lyrics
  def lyrics
    begin
      track_id = T.let(params[:spotify_track_id], String)
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
end
