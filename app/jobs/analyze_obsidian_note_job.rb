# typed: strict
# frozen_string_literal: true

class AnalyzeObsidianNoteJob < ApplicationJob
  # == Configuration
  good_job_control_concurrency_with(
    key: -> do
      T.bind(self, AnalyzeObsidianNoteJob)
      note, *_ = arguments
      "#{self.class.name}(#{note.to_gid})"
    end,
    total_limit: 1,
  )
  queue_with_priority 10

  # == Job
  sig { params(note: ObsidianNote).void }
  def perform(note)
    note.analyze
  end
end
