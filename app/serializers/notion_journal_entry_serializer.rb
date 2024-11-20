# typed: true
# frozen_string_literal: true

class NotionJournalEntrySerializer < ApplicationSerializer
  # == Configuration
  object_as :journal_entry, model: "NotionJournalEntry"

  # == Attributes
  identifier
  attributes :started_at, :title, content: { type: "any[]" }

  attribute :next_journal_entry_id, type: :string, nullable: true do
    NotionJournalEntry.with_content
      .where(started_at: ...journal_entry.started_at)
      .order(started_at: :desc)
      .pick(:id)
  end

  attribute :url, type: :string do
    root_url(journal_entry_id: journal_entry.id)
  end
end
