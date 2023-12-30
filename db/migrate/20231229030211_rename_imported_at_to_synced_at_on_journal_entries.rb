# typed: true
# frozen_string_literal: true

class RenameImportedAtToSyncedAtOnJournalEntries < ActiveRecord::Migration[7.1]
  def change
    rename_column :journal_entries, :imported_at, :synced_at
  end
end
