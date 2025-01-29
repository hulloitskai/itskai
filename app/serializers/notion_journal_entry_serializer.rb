# typed: true
# frozen_string_literal: true

# == Schema Information
#
# Table name: notion_journal_entries
#
#  id             :uuid             not null, primary key
#  content        :jsonb
#  last_edited_at :datetime         not null
#  started_at     :datetime         not null
#  synced_at      :datetime         not null
#  title          :string           not null
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#  notion_page_id :string           not null
#
# Indexes
#
#  index_notion_journal_entries_on_notion_page_id  (notion_page_id) UNIQUE
#  index_notion_journal_entries_on_started_at      (started_at)
#
class NotionJournalEntrySerializer < ApplicationSerializer
  # == Configuration
  object_as :journal_entry, model: "NotionJournalEntry"

  # == Attributes
  identifier
  attributes :started_at, :title, content: { type: "any[]" }

  attribute :next_entry_id, type: :string, nullable: true do
    NotionJournalEntry.with_content
      .where(started_at: ...journal_entry.started_at)
      .order(started_at: :desc)
      .pick(:id)
  end

  attribute :url, type: :string do
    root_url(journal_entry_id: journal_entry.id)
  end
end
