# typed: true
# frozen_string_literal: true

class AddTelegramChatIdToPensieveMessages < ActiveRecord::Migration[7.0]
  def change
    remove_index :pensieve_messages, :telegram_message_id, unique: true
    add_column :pensieve_messages, :telegram_chat_id, :bigint
    up_only do
      PensieveMessage
        .where(telegram_chat_id: nil)
        .update_all(telegram_chat_id: 0) # rubocop:disable Rails/SkipsModelValidations
    end
    change_column_null :pensieve_messages, :telegram_chat_id, false
    add_index :pensieve_messages,
      %i[telegram_chat_id telegram_message_id],
      name: "index_pensieve_messages_uniqueness",
      unique: true
  end
end
