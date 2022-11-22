# typed: true
# frozen_string_literal: true

class CreateObsidianNotes < ActiveRecord::Migration[7.0]
  def change
    create_table :obsidian_notes, id: :uuid do |t|
      t.string :name, null: false, index: true
      t.string :aliases, array: true, null: false, default: [], index: true
      t.string :tags, array: true, null: false, default: [], index: true
      t.text :content, null: false
      t.timestamptz :modified_at, null: false

      t.timestamps
    end
  end
end
