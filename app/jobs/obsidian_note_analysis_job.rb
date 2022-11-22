# typed: strict
# frozen_string_literal: true

class ObsidianNoteAnalysisJob < ApplicationJob
  extend T::Sig

  # == Configuration ==
  good_job_control_concurrency_with enqueue_limit: 1, perform_limit: 1

  sig { void }
  def perform
    ObsidianNote
      .where(analyzed_at: nil)
      .or(ObsidianNote.where("analyzed_at < modified_at"))
      .find_each do |note|
        note = T.let(note, ObsidianNote)
        note.analyze_later
      end
  end
end
