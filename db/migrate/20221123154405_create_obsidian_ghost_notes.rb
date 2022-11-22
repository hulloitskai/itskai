# typed: true
# frozen_string_literal: true

class CreateObsidianGhostNotes < ActiveRecord::Migration[7.0]
  def change
    create_table :obsidian_ghost_notes, id: :uuid do |t|
      t.string :name, null: false, index: { unique: true }

      t.timestamps
    end
  end
end
