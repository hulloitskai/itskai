# typed: true
# frozen_string_literal: true

class SyncJournalEntriesJob < ApplicationJob
  # == Configuration
  good_job_control_concurrency_with key: name, total_limit: 1

  # == Callbacks
  around_perform :with_activity_logging

  # == Job
  sig { void }
  def perform
    JournalEntriesService.sync
  end

  private

  # == Callback handlers
  sig { params(block: T.proc.void).void }
  def with_activity_logging(&block)
    ActivityService.update_status("Syncing journal entries")
    yield
    ActivityService.update_status("Journal entries synced")
  end
end
