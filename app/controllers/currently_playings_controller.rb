# typed: true
# frozen_string_literal: true

class CurrentlyPlayingsController < ApplicationController
  # == Actions
  # GET /currently_playing
  def show
    currently_playing = CurrentlyPlaying.current
    render(
      json: {
        "currentlyPlaying" =>
          CurrentlyPlayingSerializer.one_if(currently_playing),
      },
    )
  end
end
