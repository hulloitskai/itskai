# typed: strict
# frozen_string_literal: true

class SyncJournalEntryJob < ApplicationJob
  # == Configuration
  good_job_control_concurrency_with(
    key: -> {
      T.bind(self, SyncJournalEntryJob)
      entry = T.let(arguments.first!, JournalEntry)
      "#{self.class.name}(#{entry.to_gid})"
    },
    total_limit: 1,
  )

  # == Job
  sig { params(entry: JournalEntry, force: T::Boolean).void }
  def perform(entry, force: false)
    options = { force: }
    entry.sync!(options.compact)
  end
end
