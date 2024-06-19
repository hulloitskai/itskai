# typed: true
# frozen_string_literal: true

# == Schema information
#
# Table name: location_log_addresses
#
#  id              :uuid             not null, primary key
#  city            :string
#  country         :string           not null
#  country_code    :string           not null
#  full_address    :string           not null
#  neighbourhood   :string
#  place_name      :string
#  postal_code     :string
#  province        :string           not null
#  street_address  :string
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
  include Identifiable

  # == Associations
  belongs_to :location_log, inverse_of: :address, touch: true

  sig { returns(LocationLog) }
  def location_log!
    location_log or raise ActiveRecord::RecordNotFound, "Missing location log"
  end

  # == Normalizations
  removes_blank :city,
                :neighbourhood,
                :place_name,
                :postal_code,
                :street_address

  # == Validations
  validates :country,
            :country_code,
            :full_address,
            :province,
            presence: true

  # == Callbacks
  after_create_commit :broadcast_location, :broadcast_approximate_location

  # == Methods
  sig { returns(String) }
  def full_address
    [
      place_name,
      street_address,
      neighbourhood,
      city,
      province,
      country,
    ].compact.uniq.join(", ")
  end

  sig { returns(String) }
  def approximate_address
    [neighbourhood, city, province, country].compact.uniq.join(", ")
  end

  sig { returns(String) }
  def google_maps_area_url
    uri = Addressable::URI.parse("https://www.google.com/maps/search/")
    uri.query_values = { "api" => 1, "query" => approximate_address }
    uri.to_s
  end

  private

  # == Callback handlers
  sig { void }
  def broadcast_location
    LocationChannel.broadcast(location_log!)
  end

  sig { void }
  def broadcast_approximate_location
    ApproximateLocationChannel.broadcast(location_log!)
  end
end
