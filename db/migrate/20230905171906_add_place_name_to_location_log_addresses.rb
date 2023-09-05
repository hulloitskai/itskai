# typed: true
# frozen_string_literal: true

class AddPlaceNameToLocationLogAddresses < ActiveRecord::Migration[7.0]
  def change
    add_column :location_log_addresses, :place_name, :string
    add_column :location_log_addresses, :street_address, :string
  end
end
