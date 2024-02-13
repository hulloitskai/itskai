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

  # == Callbacks
  before_perform :set_activity_status

  # == Job
  sig { params(entry: JournalEntry, force: T.nilable(T::Boolean)).void }
  def perform(entry, force: nil)
    options = { force: }
    entry.sync!(options.compact)
  end

  private

  # == Callback Handlers
  sig { void }
  def set_activity_status
    entry = T.let(arguments.first!, JournalEntry)
    ActivityStatus.current = "Syncing journal entry: #{entry.title}"
  end
end
