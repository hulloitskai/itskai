# typed: strict
# frozen_string_literal: true

module Types
  class LocationTrailMarkerType < BaseObject
    # == Fields
    field :coordinates, CoordinatesType, null: false
    field :id, ID, null: false
    field :timestamp, DateTimeType, null: false

    # == Helpers
    sig { override.returns(LocationLog) }
    def object = super
  end
end
