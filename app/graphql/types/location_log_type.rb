# typed: strict
# frozen_string_literal: true

module Types
  class LocationLogType < BaseObject
    # == Interfaces
    implements NodeType

    # == Fields
    field :approximate_address, String, null: false
    field :approximate_coordinates, CoordinatesType, null: false
    field :details, LocationDetailsType, null: false do
      argument :password, String, required: true
    end
    field :google_maps_area_url, String, null: false
    field :timestamp, DateTimeType, null: false

    # == Resolvers
    delegate :approximate_address, :google_maps_area_url, to: :address

    sig { returns(T.untyped) }
    def approximate_coordinates
      coords = object.coordinates
      LocationLog.coordinates_factory.point(
        coords.x.round(2),
        coords.y.round(2),
      )
    end

    sig { params(password: String).returns(LocationDetails) }
    def details(password:)
      access_grant = LocationAccessGrant.valid.find_by(password:) or
        raise GraphQL::ExecutionError, "Password is invalid or expired."
      LocationDetails.new(log: object, access_grant:)
    end

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
