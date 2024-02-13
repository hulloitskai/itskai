# typed: true
# frozen_string_literal: true

class CreateDishwatchDevices < ActiveRecord::Migration[7.1]
  def change
    create_table :dishwatch_devices, id: :uuid do |t|
      t.string :name, null: false

      t.timestamps
    end
  end
end
