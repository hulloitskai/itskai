# typed: true
# frozen_string_literal: true

class AddTokenToLocationAccesses < ActiveRecord::Migration[7.1]
  def change
    up_only { execute("DELETE FROM location_accesses") }
    change_table :location_accesses do |t|
      t.rename :timestamp, :created_at
      t.change_default(:created_at, nil)
      t.string :token, null: false, index: { unique: true }
    end
  end
end
