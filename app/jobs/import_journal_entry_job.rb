# typed: true
# frozen_string_literal: true

class ImportJournalEntryJob < ApplicationJob
  # == Configuration
  good_job_control_concurrency_with(
    key: -> {
      T.bind(self, ImportJournalEntryJob)
      entry = T.let(arguments.first!, JournalEntry)
      "#{self.class.name}(#{entry.to_gid})"
    },
    total_limit: 1,
  )

  # == Callbacks
  before_perform :update_activity_status

  # == Job
  sig { params(entry: JournalEntry, force: T.nilable(T::Boolean)).void }
  def perform(entry, force: nil)
    options = { force: }
    entry.import(**options.compact)
  end

  private

  # == Callback handlers
  sig { void }
  def update_activity_status
    entry = T.let(arguments.first!, JournalEntry)
    ActivityService.update_status("Importing journal entry: #{entry.title}")
  end
end
