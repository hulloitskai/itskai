# typed: true
# frozen_string_literal: true

class RemoveDishwatcher < ActiveRecord::Migration[7.1]
  def change
    drop_table :dishwatcher_captures
    drop_table :dishwatcher_devices
  end
end
