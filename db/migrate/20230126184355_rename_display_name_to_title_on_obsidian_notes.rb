# typed: true
# frozen_string_literal: true

class RenameDisplayNameToTitleOnObsidianNotes < ActiveRecord::Migration[7.0]
  def change
    rename_column :obsidian_notes, :display_name, :title
    ObsidianNote.where(title: nil).find_each(&:save!)
    change_column_null :obsidian_notes, :title, false
  end
end
