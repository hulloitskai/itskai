# typed: strict
# frozen_string_literal: true

class ObsidianNoteAnalysisJob < ApplicationJob
  extend T::Sig

  # == Configuration
  good_job_control_concurrency_with total_limit: 1, key: name

  # == Callbacks
  around_perform :update_activity_status_around

  sig { params(force: T::Boolean).void }
  def perform(force: false)
    notes = ObsidianNote.all
    notes = notes
      .where(analyzed_at: nil)
      .or(ObsidianNote.where("analyzed_at < modified_at")) unless force
    notes.find_each do |note|
      note = T.let(note, ObsidianNote)
      note.analyze_later
    end
  end

  private

  # == Callbacks
  sig { params(block: T.proc.void).void }
  def update_activity_status_around(&block)
    ActivityStatus.update("Analyzing notes")
    yield
    ActivityStatus.update("Note analysis complete")
  end
end
