# typed: strict
# frozen_string_literal: true

class ImportJournalEntriesJob < ApplicationJob
  # == Configuration
  good_job_control_concurrency_with key: name, total_limit: 1

  # == Callbacks
  around_perform :with_activity_logging

  # == Job
  sig { void }
  def perform
    JournalEntry.import
  end

  private

  # == Callback Handlers
  sig { params(block: T.proc.void).void }
  def with_activity_logging(&block)
    ActivityService.update_status("Importing journal entries")
    yield
    ActivityService.update_status("Journal import complete")
  end
end
