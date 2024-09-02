# typed: true
# frozen_string_literal: true

class CreateDishwatchCaptures < ActiveRecord::Migration[7.1]
  def change
    create_table :dishwatch_captures, id: :uuid do |t|
      t.belongs_to :device,
        null: false,
        foreign_key: {
          to_table: :dishwatch_devices,
        },
        type: :uuid

      t.timestamptz :created_at, null: false
    end
  end
end
