# typed: true
# frozen_string_literal: true

class RenameDeviceIdToActorIdOnPensieveMessageLikes < ActiveRecord::Migration[7.0] # rubocop:disable Layout/LineLength
  def change
    rename_column :pensieve_message_likes, :device_id, :actor_id
  end
end
