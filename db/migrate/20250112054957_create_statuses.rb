# typed: true
# frozen_string_literal: true

class CreateStatuses < ActiveRecord::Migration[7.1]
  def change
    create_table :statuses, id: :uuid do |t|
      t.string :emoji
      t.text :text, null: false
      t.timestamptz :created_at, null: false, index: true
    end
  end
end
