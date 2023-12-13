# typed: true
# frozen_string_literal: true

module Journeys
  class SessionsController < ApplicationController
    # == Filters
    before_action :set_session, only: :show

    # == Actions
    def show
      session = @session or raise "Missing session"
      if allowed_to?(:show?, session)
        data = query!("JourneysSessionPageQuery", {
          session_id: session.to_gid.to_s,
        })
        render(inertia: "JourneysSessionPage", props: {
          homepage_url: journeys_root_url,
          data:,
        })
      else
        redirect_to(
          journeys_root_path,
          alert: "You are not a participant in this session.",
        )
      end
    end

    def create
      session = T.let(Session.joinable.first || Session.new, Session)
      goal = transcribe_goal_recording
      session.participations.build(
        participant_id:,
        goal:,
        **participation_params,
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
    sig { returns(ActionController::Parameters) }
    def participation_params
      params.require(:participation).permit(:participant_name)
    end

    sig { returns(OpenAI::Client) }
    def client
      @client ||= T.let(OpenAI::Client.new, T.nilable(OpenAI::Client))
    end

    sig { returns(ActionDispatch::Http::UploadedFile) }
    def goal_recording
      params.fetch(:goal_recording)
    end

    sig { returns(String) }
    def transcribe_goal_recording
      recording = goal_recording
      Tempfile.open(["recording", ".webm"], binmode: true) do |file|
        file.write(recording.read)
        file.flush
        # movie = FFMPEG::Movie.new(file.path)
        # movie.transcode(file.path, { audio_codec: "webm" })
        file.seek(0)
        response = client.audio.translate(
          parameters: {
            model: "whisper-1",
            file:,
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
