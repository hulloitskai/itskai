# typed: true
# frozen_string_literal: true

class ImportJournalEntriesJob < ApplicationJob
  # == Configuration
  good_job_control_concurrency_with key: name, total_limit: 1

  # == Callbacks
  around_perform :with_status

  # == Job
  sig { void }
  def perform
    JournalEntry.import!
  end

  private

  # == Callback Handlers
  sig { params(block: T.proc.void).void }
  def with_status(&block)
    Activity.status = "Importing journal entries"
    yield
    Activity.status = "Journal entries imported"
  end
end
