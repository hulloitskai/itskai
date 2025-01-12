# typed: true
# frozen_string_literal: true

class AddFriendToPushSubscriptions < ActiveRecord::Migration[7.1]
  def change
    change_table :push_subscriptions do |t|
      t.belongs_to :friend, type: :uuid, foreign_key: true
    end
  end
end
