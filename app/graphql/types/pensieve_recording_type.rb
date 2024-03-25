# typed: strict
# frozen_string_literal: true

module Types
  class PensieveRecordingType < BaseObject
    # == Interfaces
    implements NodeType

    # == Fields
    field :audio, FileType, method: :audio_blob
    field :created_at, DateTimeType, null: false
    field :transcription, String

    # == Helpers
    sig { override.returns(::PensieveRecording) }
    def object = super
  end
end
