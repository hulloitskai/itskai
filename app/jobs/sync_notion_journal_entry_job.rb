# typed: strict
# frozen_string_literal: true

class SyncNotionJournalEntryJob < ApplicationJob
  # == Configuration
  good_job_control_concurrency_with(
    key: -> {
      T.bind(self, SyncNotionJournalEntryJob)
      entry, = arguments
      "#{self.class.name}(#{entry.to_gid})"
    },
    total_limit: 1,
  )
  queue_with_priority 10

  # == Job
  sig { params(entry: NotionJournalEntry, force: T::Boolean).void }
  def perform(entry, force: false)
    options = { force: }
    entry.sync!(options.compact)
  end
end
