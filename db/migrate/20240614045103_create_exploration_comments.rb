# typed: true
# frozen_string_literal: true

class CreateExplorationComments < ActiveRecord::Migration[7.1]
  def change
    create_table :exploration_comments, id: :uuid do |t|
      t.string :exploration_id, null: false
      t.text :message, null: false
      t.string :author_contact, null: false
      t.timestamptz :created_at, null: false
    end
  end
end
