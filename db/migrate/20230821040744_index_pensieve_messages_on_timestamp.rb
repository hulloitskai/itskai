# typed: true
# frozen_string_literal: true

class IndexPensieveMessagesOnTimestamp < ActiveRecord::Migration[7.0]
  def change
    add_index :pensieve_messages, :timestamp
  end
end
