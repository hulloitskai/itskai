# typed: true
# frozen_string_literal: true

class AddSynchronizedAtToObsidianNotes < ActiveRecord::Migration[7.0]
  def change
    add_column :obsidian_notes, :synchronized_at, :timestamptz
    add_index :obsidian_notes, :synchronized_at
  end
end
