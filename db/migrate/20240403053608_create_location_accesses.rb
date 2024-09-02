# typed: true
# frozen_string_literal: true

class CreateLocationAccesses < ActiveRecord::Migration[7.1]
  def change
    create_table :location_accesses, id: :uuid do |t|
      t.belongs_to :grant,
        null: false,
        foreign_key: { to_table: :location_access_grants },
        type: :uuid
      t.timestamptz :timestamp, null: false, default: -> { "NOW()" }
    end
  end
end
