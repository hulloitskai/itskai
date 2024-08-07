# typed: strict
# frozen_string_literal: true

class SyncNotionJournalEntriesJob < ApplicationJob
  # == Configuration
  good_job_control_concurrency_with key: name, total_limit: 1

  # == Job
  sig { void }
  def perform
    NotionJournalEntry.sync
  end
end
