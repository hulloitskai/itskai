# typed: true
# frozen_string_literal: true

class AddUniqueNameConstraintOnObsidianNotes < ActiveRecord::Migration[7.0]
  def change
    change_table :obsidian_notes do |t|
      t.remove_index :name
      t.index :name, unique: true
    end
  end
end
