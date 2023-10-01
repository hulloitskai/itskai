# typed: true
# frozen_string_literal: true

class AddToToPensieveMessages < ActiveRecord::Migration[7.0]
  def change
    add_column :pensieve_messages, :to, :string
    add_index :pensieve_messages, :to
  end
end
