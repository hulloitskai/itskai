# typed: true
# frozen_string_literal: true

class AddBlurbToObsidianNotes < ActiveRecord::Migration[7.0]
  def change
    add_column :obsidian_notes, :blurb, :string
  end
end
