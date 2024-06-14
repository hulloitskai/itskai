# typed: true
# frozen_string_literal: true

class SpotifyTracksController < ApplicationController
  # == Filters
  before_action :set_track_id

  # == Actions
  def lyrics
    begin
      track_id = T.must(@track_id)
      lyrics = SpotifyClient.retrieve_lyrics(track_id)
    rescue => error
      render(
        json: { error: error.message },
        status: :internal_server_error,
      ) and return
    end
    if lyrics
      render(json: { lyrics: LyricLineSerializer.many(lyrics) })
    else
      render(json: { lyrics: [] })
    end
  end

  private

  # == Filter Handlers
  def set_track_id
    @track_id = T.let(params.fetch(:spotify_track_id), T.nilable(String))
  end
end
