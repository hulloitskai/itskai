# typed: strict
# frozen_string_literal: true

class DownloadJournalEntryJob < ApplicationJob
  # == Configuration
  good_job_control_concurrency_with(
    key: -> {
      T.bind(self, DownloadJournalEntryJob)
      entry = T.let(arguments.first!, JournalEntry)
      "#{self.class.name}(#{entry.to_gid})"
    },
    total_limit: 1,
  )

  # == Job
  sig { params(entry: JournalEntry).void }
  def perform(entry)
    entry.download
  end
end
