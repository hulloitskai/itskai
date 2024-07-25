# typed: true
# frozen_string_literal: true

class RenameJournalEntriesToNotionJournalEntries < ActiveRecord::Migration[7.1]
  def change
    rename_table :journal_entries, :notion_journal_entries
  end
end
