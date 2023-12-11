# typed: true
# frozen_string_literal: true

module Journey
  class HomeController < ApplicationController
    # == Actions
    def show
      render(inertia: "JourneyHomePage", props: {
        transcription_url: journey_transcriptions_path,
      })
    end
  end
end
