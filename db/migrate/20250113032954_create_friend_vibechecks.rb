# typed: true
# frozen_string_literal: true

class CreateFriendVibechecks < ActiveRecord::Migration[7.1]
  def change
    create_table :friend_vibechecks, id: :uuid do |t|
      t.string :vibe, null: false
      t.belongs_to :friend, null: false, foreign_key: true, type: :uuid
      t.timestamptz :created_at, null: false
    end
  end
end
