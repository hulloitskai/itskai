# typed: strict
# frozen_string_literal: true

class ImportObsidianNoteJob < ApplicationJob
  # == Configuration
  good_job_control_concurrency_with(
    key: -> {
      T.bind(self, AnalyzeObsidianNoteJob)
      note = T.let(arguments.first!, ObsidianNote)
      "#{self.class.name}:#{note.id}"
    },
    total_limit: 1,
  )

  # == Callbacks
  before_perform :update_activity_status

  # == Job
  sig { params(note: ObsidianNote, force: T::Boolean).void }
  def perform(note, force: false)
    note.import(force:)
  end

  private

  # == Callback Handlers
  sig { void }
  def update_activity_status
    entry = T.let(arguments.first!, JournalEntry)
    ActivityService.update_status("Importing Obsidian note: #{entry.title}")
  end
end
