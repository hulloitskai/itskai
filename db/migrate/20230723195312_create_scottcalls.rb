# typed: true
# frozen_string_literal: true

class CreateScottcalls < ActiveRecord::Migration[7.0]
  def change
    create_table :scottcalls, id: :uuid do |t|
      t.string :telnyx_call_control_id, null: false, index: { unique: true }
      t.text :message, null: false
      t.timestamptz :created_at, null: false
    end
  end
end
