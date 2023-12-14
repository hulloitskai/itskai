# typed: true
# frozen_string_literal: true

module Journeys
  class SessionsController < ApplicationController
    # == Filters
    before_action :set_session, only: :show

    # == Actions
    def show
      session = @session or raise "Missing session"
      data = query!("JourneysSessionPageQuery", {
        session_id: session.to_gid.to_s,
        participant_id:,
      })
      render(inertia: "JourneysSessionPage", props: {
        homepage_url: journeys_root_url,
        data:,
      })
    end

    def create
      session = T.let(Session.active.first || Session.new, Session)
      goal = transcribe_recording
      session.participations.build(
        participant_id:,
        goal:,
      )
      session.save!
      redirect_to(journeys_session_path(session))
    rescue => error
      redirect_to(
        journeys_root_path,
        alert: "Failed to start session: #{error.message}",
      )
    end

    private

    # == Helpers
    sig { returns(OpenAI::Client) }
    def client
      @client ||= T.let(OpenAI::Client.new, T.nilable(OpenAI::Client))
    end

    sig { returns(ActionDispatch::Http::UploadedFile) }
    def recording
      params.fetch(:recording)
    end

    sig { returns(String) }
    def transcribe_recording
      recording = self.recording
      ext = MIME::Types[recording.content_type].first&.preferred_extension or
        raise "Could not determine recording file type"
      Tempfile.open(["recording", ".#{ext}"], binmode: true) do |file|
        file.write(recording.read)
        file.flush
        # Clean up bad recordings using FFMPEG
        movie = FFMPEG::Movie.new(file.path)
        movie.transcode(file.path)
        file.seek(0)
        response = client.audio.translate(
          parameters: {
            model: "whisper-1",
            file:,
            prompt:
              "today i'm going to learn how to draw. and then i'm going to " \
              "share my drawing with 10 friends.",
          },
        )
        response.fetch("text")
      end
    end

    # == Filter Handlers
    sig { void }
    def set_session
      @session = T.let(
        Session.friendly.find(params.fetch(:id)),
        T.nilable(Session),
      )
    end
  end
end
