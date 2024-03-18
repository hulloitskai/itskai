# typed: strict
# frozen_string_literal: true

class TranscribePensieveRecordingJob < ApplicationJob
  # == Configuration
  good_job_control_concurrency_with(
    key: -> {
      T.bind(self, TranscribePensieveRecordingJob)
      entry = T.let(arguments.first!, PensieveRecording)
      "#{self.class.name}(#{entry.to_gid})"
    },
    total_limit: 1,
  )
  # == Job
  sig do
    params(recording: PensieveRecording, force: T.nilable(T::Boolean)).void
  end
  def perform(recording, force: nil)
    if force
      recording.transcribe!
    else
      recording.transcribe
    end
  end
end
