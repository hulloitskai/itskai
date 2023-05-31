# typed: true
# frozen_string_literal: true

class AddUniqueConstraintToSlugOnObsidianNotes < ActiveRecord::Migration[7.0]
  def change
    reversible do |dir|
      dir.up do
        ObsidianNote.destroy_by(slug: "t")
      end
    end
    add_index :obsidian_notes, :slug, unique: true
  end
end
