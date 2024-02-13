# typed: true
# frozen_string_literal: true

class RenameDishwatchToDishwatcher < ActiveRecord::Migration[7.1]
  def change
    rename_table :dishwatch_captures, :dishwatcher_captures
    rename_table :dishwatch_devices, :dishwatcher_devices
  end
end
