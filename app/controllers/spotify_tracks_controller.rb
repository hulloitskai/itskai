# typed: true
# frozen_string_literal: true

class SpotifyTracksController < ApplicationController
  # == Filters
  before_action :set_track_id

  # == Actions
  def lyrics
    begin
      lyrics = SpotifyClient.retrieve_lyrics(T.must(@track_id))
    rescue => error
      render(
        json: { error: error.message },
        status: :internal_server_error,
      ) and return
    end
    if lyrics
      render(json: { lyrics: LyricLineSerializer.render(lyrics) })
    else
      render(json: { lyrics: [] })
    end
  end

  private

  # == Filter Handlers
  def set_track_id
    @track_id = T.let(params.fetch(:id), T.nilable(String))
  end
end
