# typed: true
# frozen_string_literal: true

class CreatePensieveMessages < ActiveRecord::Migration[7.0]
  def change
    create_table :pensieve_messages, id: :uuid do |t|
      t.text :text, null: false
      t.string :from, null: false
      t.bigint :telegram_message_id, null: false, index: { unique: true }
      t.timestamptz :timestamp, null: false

      t.timestamps
    end
  end
end
