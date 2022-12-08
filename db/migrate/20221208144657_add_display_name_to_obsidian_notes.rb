# typed: true
# frozen_string_literal: true

class AddDisplayNameToObsidianNotes < ActiveRecord::Migration[7.0]
  def change
    add_column :obsidian_notes, :display_name, :string
  end
end
