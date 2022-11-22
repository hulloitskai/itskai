# typed: true
# frozen_string_literal: true

class AddAnalyzedAtToObsidianNotes < ActiveRecord::Migration[7.0]
  def change
    add_column :obsidian_notes, :analyzed_at, :timestamptz
    add_index :obsidian_notes, :analyzed_at
    add_index :obsidian_notes, :modified_at
  end
end
