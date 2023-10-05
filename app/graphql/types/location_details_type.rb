# typed: strict
# frozen_string_literal: true

module Types
  class LocationDetailsType < BaseObject
    # == Fields
    field :address, String, null: false
    field :coordinates, CoordinatesType, null: false
    field :expires_at, DateTimeType, null: false
    field :trail, [LocationTrailMarkerType], null: false

    # == Helpers
    sig { override.returns(LocationDetails) }
    def object = super
  end
end
