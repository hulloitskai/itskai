# typed: true
# frozen_string_literal: true

class ApproximateLocationSerializer < ApplicationSerializer
  # == Configuration
  object_as :log, model: "LocationLog"

  # == Attributes
  identifier
  attributes :timestamp,
             approximate_address: { type: :string },
             google_maps_area_url: { type: :string }

  # == Associations
  has_one :approximate_coordinates, serializer: CoordinatesSerializer
end
