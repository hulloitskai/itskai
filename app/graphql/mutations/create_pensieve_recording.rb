# typed: strict
# frozen_string_literal: true

module Mutations
  class CreatePensieveRecording < BaseMutation
    # == Payload
    class Payload < T::Struct
      const :recording, PensieveRecording
    end

    # == Fields
    field :recording, Types::PensieveRecordingType, null: false

    # == Arguments
    argument :audio, Types::UploadInputType

    # == Resolver
    sig { params(audio: String).returns(Payload) }
    def resolve(audio:)
      authorize!(to: :create?, with: PensieveRecordingPolicy)
      user = current_user!
      audio_blob = ActiveStorage::Blob.find_signed!(audio)
      if ActiveStorage::Blob
          .where(checksum: audio_blob.checksum)
          .where.not(id: audio_blob.id).exists?
        raise GraphQL::ExecutionError,
              "Audio has already been uploaded."
      end
      recording = PensieveRecording.create!(user:, audio_blob:)
      Payload.new(recording:)
    end
  end
end
