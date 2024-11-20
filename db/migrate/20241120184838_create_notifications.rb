# typed: true
# frozen_string_literal: true

class CreateNotifications < ActiveRecord::Migration[7.1]
  def change
    create_table :notifications, id: :uuid do |t|
      t.timestamptz :delivered_at
      t.string :delivery_token, null: false
      t.belongs_to :noticeable, polymorphic: true, null: false, type: :uuid
      t.timestamptz :pushed_at

      t.timestamps
    end
  end
end
