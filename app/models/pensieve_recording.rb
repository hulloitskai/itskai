# typed: strict
# frozen_string_literal: true

# == Schema Information
#
# Table name: pensieve_recordings
#
#  id            :uuid             not null, primary key
#  transcription :text
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  user_id       :uuid             not null
#
# Indexes
#
#  index_pensieve_recordings_on_user_id  (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#
class PensieveRecording < ApplicationRecord
  # == Associations
  belongs_to :user

  # == Attachments
  has_one_attached :audio

  sig { returns(ActiveStorage::Blob) }
  def audio_blob!
    audio_blob or raise "Missing audio blob"
  end

  # == Callbacks
  after_commit :trigger_subscriptions, on: %i[create update]

  # == Methods
  sig { returns(String) }
  def transcribe
    transcription = audio_blob!.open do |file|
      name = File.basename(file.to_path)
      # file.write(recording.read)
      # file.flush

      # # Clean up bad recordings using FFMPEG.
      # movie = FFMPEG::Movie.new(file.path)
      # movie.transcode(file.path)
      # file.seek(0)
      with_log_tags do
        logger.info("Transcribing audio file `#{name}' with Whisper")
      end
      response = client.audio.translate(parameters: {
        model: "whisper-1",
        file:,
      })
      response.fetch("text")
    end
    update!(transcription:)
    transcription
  end

  sig { returns(String) }
  def transcribe!
    transcription or transcribe
  end

  private

  # == Helpers
  sig { returns(OpenAI::Client) }
  def client
    @client ||= T.let(OpenAI::Client.new, T.nilable(OpenAI::Client))
  end

  # == Callback Handlers
  sig { void }
  def trigger_subscriptions
    Schema.subscriptions!.trigger(
      :pensieve_recording,
      { id: to_gid.to_s },
      self,
    )
  end
end
