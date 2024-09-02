# typed: true
# frozen_string_literal: true

class CreatePensieveMessageLikes < ActiveRecord::Migration[7.0]
  def change
    create_table :pensieve_message_likes, id: :uuid do |t|
      t.belongs_to :message,
        null: false,
        foreign_key: { to_table: "pensieve_messages" },
        type: :uuid
      t.string :session_id, null: false
      t.index %i[message_id session_id],
        unique: true,
        name: "index_pensieve_message_likes_uniqueness"
      t.timestamptz :created_at, null: false
    end
  end
end
