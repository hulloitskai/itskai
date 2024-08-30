# typed: strict
# frozen_string_literal: true

class DownloadNotionJournalEntryJob < ApplicationJob
  # == Configuration
  good_job_control_concurrency_with(
    key: -> {
      T.bind(self, DownloadNotionJournalEntryJob)
      entry, *_ = arguments
      "#{self.class.name}(#{entry.to_gid})"
    },
    total_limit: 1,
  )

  # == Job
  sig { params(entry: NotionJournalEntry).void }
  def perform(entry)
    entry.download
  end
end
