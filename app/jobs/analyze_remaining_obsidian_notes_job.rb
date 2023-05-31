# typed: strict
# frozen_string_literal: true

class AnalyzeRemainingObsidianNotesJob < ApplicationJob
  # == Configuration
  good_job_control_concurrency_with total_limit: 1, key: name

  # == Callbacks
  around_perform :with_activity_logging

  # == Job
  sig { params(force: T::Boolean).void }
  def perform(force: false)
    notes = ObsidianNote.all
    notes = notes
      .where(analyzed_at: nil)
      .or(ObsidianNote.where("analyzed_at < modified_at")) unless force
    notes.find_each(&:analyze_later)
  end

  private

  # == Callback Handlers
  sig { params(block: T.proc.void).void }
  def with_activity_logging(&block)
    ActivityService.update_status("Analyzing notes")
    yield
    ActivityService.update_status("Note analysis complete")
  end
end
