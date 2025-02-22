# typed: true
# frozen_string_literal: true

class DropAlerts < ActiveRecord::Migration[8.0]
  def change
    drop_table :alerts
  end
end
