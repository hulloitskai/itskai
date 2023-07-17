# frozen_string_literal: true

class CreateLocationLogAddresses < ActiveRecord::Migration[7.0]
  def change
    create_table :location_log_addresses, id: :uuid do |t|
      t.belongs_to :location_log, null: false, foreign_key: true, type: :uuid
      t.string :full_address, null: false
      t.string :country, null: false
      t.string :country_code, null: false
      t.string :province, null: false
      t.string :city
      t.string :neighbourhood
      t.string :postal_code
      t.timestamptz :created_at, null: false
    end
  end
end
