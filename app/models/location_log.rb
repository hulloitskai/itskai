# typed: true
# frozen_string_literal: true

# == Schema Information
#
# Table name: location_logs
#
#  id                  :uuid             not null, primary key
#  coordinates         :geography        not null, point, 4326
#  floor_level         :integer          not null
#  horizontal_accuracy :float            not null
#  timestamp           :datetime         not null
#  vertical_accuracy   :float            not null
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#
# Indexes
#
#  index_location_logs_on_timestamp  (timestamp)
#
class LocationLog < ApplicationRecord
  include Identifiable

  # == Attributes
  sig { returns(Float) }
  def latitude = coordinates.latitude

  sig { returns(Float) }
  def longitude = coordinates.longitude

  sig { returns(Float) }
  def altitude = coordinates.z

  # == Associations
  has_one :address,
          class_name: "LocationLogAddress",
          dependent: :destroy

  sig { returns(LocationLogAddress) }
  def address!
    address or raise ActiveRecord::RecordNotFound, "Missing address"
  end

  # == Scopes
  scope :with_address, -> {
    T.bind(self, PrivateRelation)
    left_joins(:address).where.not(location_log_addresses: { id: nil })
  }

  scope :_latest, -> {
    T.bind(self, PrivateRelation)
    with_address.order(timestamp: :desc).limit(1)
  }
  private_class_method :_latest

  # == Callbacks
  after_create :reverse_geocode_and_save!

  # == Geocoding
  reverse_geocoded_by :latitude, :longitude do |log, results|
    if (result = results.first)
      result = T.cast(result, Geocoder::Result::Nominatim)
      quarter = T.let(result.data.dig("address", "quarter"),
                      T.nilable(String))
      log.build_address(
        full_address: result.address,
        country: result.country,
        country_code: result.country_code,
        province: result.province,
        city: result.city,
        neighbourhood: result.neighbourhood || quarter,
        postal_code: result.postal_code,
      )
    end
  end

  # == Finders
  sig { params(args: T.untyped).returns(T.nilable(LocationLog)) }
  def self.latest(*args)
    relation = _latest
    relation = relation.where(*T.unsafe(args)) if args.present?
    relation.first
  end

  sig { params(args: T.untyped).returns(LocationLog) }
  def self.latest!(*args)
    relation = _latest
    relation = relation.where(*T.unsafe(args)) if args.present?
    relation.first!
  end

  # == Geocoding
  sig { returns(RGeo::Geographic::Factory) }
  def self.coordinates_factory
    RGeo::Geographic.spherical_factory(srid: 4326, has_z_coordinate: true)
  end

  sig { void }
  def reverse_geocode_and_save!
    reverse_geocode.tap { save! }
  end
end
