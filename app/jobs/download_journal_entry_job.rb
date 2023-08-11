# typed: true
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

  # == Callbacks
  before_perform :set_status

  # == Job
  sig { params(entry: JournalEntry).void }
  def perform(entry)
    entry.download
  end

  private

  # == Callback Handlers
  sig { void }
  def set_status
    entry = T.let(arguments.first!, JournalEntry)
    Activity.status = "Downloading journal entry: #{entry.title}"
  end
end
