# typed: true
# frozen_string_literal: true

class AddSecretKeyToDishwatchDevices < ActiveRecord::Migration[7.1]
  def change
    add_column :dishwatch_devices, :secret_key, :string, null: false
    add_index :dishwatch_devices, :secret_key, unique: true
  end
end
