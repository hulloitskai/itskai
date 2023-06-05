# typed: true
# frozen_string_literal: true

class AddImportedAtToJournalEntry < ActiveRecord::Migration[7.0]
  def change
    add_column :journal_entries, :imported_at, :timestamptz, null: false
  end
end
