# typed: true
# frozen_string_literal: true

class AddPublishingColumnsToObsidianNotes < ActiveRecord::Migration[7.0]
  def change
    add_column :obsidian_notes,
               :published,
               :boolean,
               null: false,
               default: false
    add_column :obsidian_notes, :slug, :string, index: { unique: true }
  end
end
