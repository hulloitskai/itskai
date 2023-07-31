# typed: true
# frozen_string_literal: true

class AnalyzeObsidianNotesJob < ApplicationJob
  # == Configuration
  good_job_control_concurrency_with total_limit: 1, key: name

  # == Callbacks
  around_perform :with_activity_logging

  # == Job
  sig { params(force: T.nilable(T::Boolean)).void }
  def perform(force: nil)
    options = { force: }
    ObsidianNote.analyze(**options.compact)
  end

  private

  # == Callback handlers
  sig { params(block: T.proc.void).void }
  def with_activity_logging(&block)
    ActivityService.update_status("Analyzing Obsidian notes")
    yield
    ActivityService.update_status("Obsidian note analysis complete")
  end
end
