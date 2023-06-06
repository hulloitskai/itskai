# typed: true
# frozen_string_literal: true

class RenameBlocksToContentOnJournalEntries < ActiveRecord::Migration[7.0]
  def change
    rename_column :journal_entries, :blocks, :content
  end
end
