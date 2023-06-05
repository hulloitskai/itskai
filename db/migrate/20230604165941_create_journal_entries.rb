# typed: true
# frozen_string_literal: true

class CreateJournalEntries < ActiveRecord::Migration[7.0]
  def change
    create_table :journal_entries, id: :uuid do |t|
      t.timestamptz :started_at, null: false
      t.timestamptz :last_edited_at, null: false
      t.string :title, null: false
      t.string :notion_page_id, null: false, index: { unique: true }
      t.jsonb :blocks

      t.timestamps
    end
  end
end
