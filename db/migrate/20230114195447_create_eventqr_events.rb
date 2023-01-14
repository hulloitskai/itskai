# typed: true
# frozen_string_literal: true

class CreateEventqrEvents < ActiveRecord::Migration[7.0]
  def change
    create_table :eventqr_events, id: :uuid do |t|
      t.string :title, null: false
      t.string :inviter_email, null: false, index: true
      t.string :inviter_name
      t.timestamptz :start, null: false
      t.timestamptz :end, null: false

      t.timestamps
    end
  end
end
