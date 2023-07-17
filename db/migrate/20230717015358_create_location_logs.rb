# typed: true
# frozen_string_literal: true

class CreateLocationLogs < ActiveRecord::Migration[7.0]
  def change
    create_table :location_logs, id: :uuid do |t|
      t.st_point :coordinates, geographic: true, has_z: true
      t.integer :floor_level, null: false
      t.float :horizontal_accuracy, null: false
      t.float :vertical_accuracy, null: false
      t.timestamptz :timestamp, null: false, index: true
      t.timestamptz :created_at, null: false
    end
  end
end
