# typed: true
# frozen_string_literal: true

class IndexJournalEntriesOnStartedAt < ActiveRecord::Migration[7.1]
  def change
    add_index :journal_entries, :started_at
  end
end
