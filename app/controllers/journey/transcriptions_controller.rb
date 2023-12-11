# typed: true
# frozen_string_literal: true

module Journey
  class TranscriptionsController < ApplicationController
    # == Actions
    def create
      recording = T.let(
        params.fetch("recording"),
        ActionDispatch::Http::UploadedFile,
      )
      Tempfile.open(["recording", ".webm"], binmode: true) do |file|
        file.write(recording.read)
        file.flush
        file.seek(0)
        movie = FFMPEG::Movie.new(file.path)
        movie.transcode(file.path, { audio_codec: "webm" })
        response = client.audio.translate(
          parameters: {
            model: "whisper-1",
            file:,
          },
        )
        render(plain: response.fetch("text"))
      end
    end

    private

    # == Helpers
    sig { returns(OpenAI::Client) }
    def client
      @client ||= T.let(OpenAI::Client.new, T.nilable(OpenAI::Client))
    end
  end
end
