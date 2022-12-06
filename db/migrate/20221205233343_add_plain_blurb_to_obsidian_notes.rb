# typed: true
# frozen_string_literal: true

class AddPlainBlurbToObsidianNotes < ActiveRecord::Migration[7.0]
  def change
    change_column :obsidian_notes, :blurb, :text
    add_column :obsidian_notes, :plain_blurb, :text
  end
end
