# typed: strict
# frozen_string_literal: true

module Types
  class LocationLogType < BaseObject
    # == Interfaces
    implements NodeType

    # == Fields
    field :approximate_address, String, null: false
    field :google_maps_area_url, String, null: false
    field :timestamp, DateTimeType, null: false

    # == Resolvers
    delegate :approximate_address, :google_maps_area_url, to: :address

    # == Helpers
    sig { override.returns(LocationLog) }
    def object = super

    private

    # == Helpers
    sig { returns(LocationLogAddress) }
    def address
      object.address!
    end
  end
end
