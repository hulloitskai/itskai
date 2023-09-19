# rubocop:disable Rails/SkipsModelValidations
# typed: true
# frozen_string_literal: true

class NormalizeNullableFieldsOnLocationLogAddresses < ActiveRecord::Migration[7.0] # rubocop:disable Layout/LineLength
  def change
    LocationLogAddress.where(city: "").update_all(city: nil)
    LocationLogAddress.where(neighbourhood: "").update_all(neighbourhood: nil)
    LocationLogAddress.where(place_name: "").update_all(place_name: nil)
    LocationLogAddress.where(postal_code: "").update_all(postal_code: nil)
    LocationLogAddress.where(street_address: "").update_all(street_address: nil)
  end
end
