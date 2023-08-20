# typed: true
# frozen_string_literal: true

class AddEditTimestampToPensieveMessages < ActiveRecord::Migration[7.0]
  def change
    add_column :pensieve_messages, :edit_timestamp, :timestamptz
  end
end
