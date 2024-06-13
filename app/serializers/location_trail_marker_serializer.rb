# typed: true
# frozen_string_literal: true

class LocationTrailMarkerSerializer < ApplicationSerializer
  # == Configuration
  object_as :log, model: "LocationLog"

  # == Attributes
  identifier
  attributes :timestamp

  # == Associations
  has_one :coordinates, serializer: CoordinatesSerializer
end
