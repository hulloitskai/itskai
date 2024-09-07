# typed: true
# frozen_string_literal: true

class AddHiddenToObsidianNotes < ActiveRecord::Migration[7.0]
  def change
    add_column :obsidian_notes,
               :hidden,
               :boolean,
               null: false,
               index: true,
               default: false
  end
end
