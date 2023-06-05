# rubocop:disable Layout/LineLength
# typed: true
# frozen_string_literal: true

class RenameSynchronizedAtToImportedAtOnObsidianNotes < ActiveRecord::Migration[7.0]
  def change
    rename_column :obsidian_notes, :synchronized_at, :imported_at
  end
end
