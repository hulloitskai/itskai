# typed: strict
# frozen_string_literal: true

class AnalyzeObsidianNotesJob < ApplicationJob
  # == Configuration
  good_job_control_concurrency_with total_limit: 1, key: name

  # == Callbacks
  around_perform :with_activity_status

  # == Job
  sig { params(force: T.nilable(T::Boolean)).void }
  def perform(force: nil)
    options = { force: }
    ObsidianNote.analyze(**options.compact)
  end

  private

  # == Callback Handlers
  sig { params(block: T.proc.void).void }
  def with_activity_status(&block)
    ActivityStatus.current = "Analyzing Obsidian notes"
    yield
    ActivityStatus.current = "Obsidian note analysis complete"
  end
end
