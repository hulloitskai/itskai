# typed: true
# frozen_string_literal: true

# == Schema Information
#
# Table name: location_log_addresses
#
#  id              :uuid             not null, primary key
#  city            :string
#  country         :string           not null
#  country_code    :string           not null
#  full_address    :string           not null
#  neighbourhood   :string
#  postal_code     :string
#  province        :string           not null
#  created_at      :datetime         not null
#  location_log_id :uuid             not null
#
# Indexes
#
#  index_location_log_addresses_on_location_log_id  (location_log_id)
#
# Foreign Keys
#
#  fk_rails_...  (location_log_id => location_logs.id)
#
class LocationLogAddress < ApplicationRecord
  # == Attributes
  include Identifiable

  # == Associations
  belongs_to :location_log, inverse_of: :address, touch: true

  # == Methods
  sig { returns(String) }
  def approximate_address
    [neighbourhood, city, province, country].compact.join(", ")
  end

  sig { returns(String) }
  def google_maps_area_url
    uri = Addressable::URI.parse("https://www.google.com/maps/search/")
    uri.query_values = {
      "api" => 1,
      "query" => approximate_address,
    }
    uri.to_s
  end
end