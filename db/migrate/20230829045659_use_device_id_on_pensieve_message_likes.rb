# typed: true
# frozen_string_literal: true

class UseDeviceIdOnPensieveMessageLikes < ActiveRecord::Migration[7.0]
  def up
    add_column :pensieve_message_likes, :device_id, :uuid
    change_column_null :pensieve_message_likes, :device_id, false
    remove_column :pensieve_message_likes, :session_id
    add_index :pensieve_message_likes,
              %i[message_id device_id],
              unique: true,
              name: "index_pensieve_message_likes_uniqueness"
  end
end
