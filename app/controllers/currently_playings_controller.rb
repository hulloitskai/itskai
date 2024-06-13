# typed: true
# frozen_string_literal: true

class CurrentlyPlayingsController < ApplicationController
  # == Actions
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
