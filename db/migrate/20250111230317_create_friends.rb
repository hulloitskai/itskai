# typed: true
# frozen_string_literal: true

class CreateFriends < ActiveRecord::Migration[7.1]
  def change
    create_table :friends, id: :uuid do |t|
      t.string :name, null: false, index: { unique: true }
      t.string :emoji, null: false
      t.string :security_token, null: false, index: { unique: true }
      t.timestamps
    end
  end
end
