# typed: true
# frozen_string_literal: true

class AddUniqueConstraintToSlugOnObsidianNotes < ActiveRecord::Migration[7.0]
  def change
    add_index :obsidian_notes, :slug, unique: true
  end
end
