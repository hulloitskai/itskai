# typed: true
# frozen_string_literal: true

class RenameSynchronizedAtToImportedAtOnObsidianNotes < ActiveRecord::Migration[7.0] # rubocop:disable Layout/LineLength
  def change
    rename_column :obsidian_notes, :synchronized_at, :imported_at
  end
end
