# typed: strict
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
  before_perform :set_activity_status

  # == Job
  sig { params(entry: JournalEntry, force: T.nilable(T::Boolean)).void }
  def perform(entry, force: nil)
    entry.import!(**{ force: }.compact)
  end

  private

  # == Callback Handlers
  sig { void }
  def set_activity_status
    entry = T.let(arguments.first!, JournalEntry)
    ActivityStatus.current = "Importing journal entry: #{entry.title}"
  end
end
