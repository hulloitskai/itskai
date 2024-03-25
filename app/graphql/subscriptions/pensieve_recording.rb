# typed: strict
# frozen_string_literal: true

module Subscriptions
  class PensieveRecording < BaseSubscription
    # == Definition
    type Types::PensieveRecordingType, null: false

    # == Arguments
    argument :id,
             ID,
             loads: Types::PensieveRecordingType,
             as: :recording

    # == Callback Handlers
    sig { params(recording: ::PensieveRecording).returns(::PensieveRecording) }
    def subscribe(recording:) = recording
  end
end
