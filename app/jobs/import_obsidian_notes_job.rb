# typed: strict
# frozen_string_literal: true

class ImportObsidianNotesJob < ApplicationJob
  # == Configuration
  good_job_control_concurrency_with key: name, total_limit: 1

  # == Callbacks
  around_perform :with_activity_logging

  # == Job
  sig { params(force: T::Boolean).void }
  def perform(force: false)
    ObsidianNote.import(force:)
  end

  private

  # == Callback Handlers
  sig { params(block: T.proc.void).void }
  def with_activity_logging(&block)
    ActivityService.update_status("Importing Obsidian notes")
    yield
    ActivityService.update_status("Obsidian notes import complete")
  end
end
