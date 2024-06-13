# typed: true
# frozen_string_literal: true

class LocationWithTrailSerializer < LocationSerializer
  # == Configuration
  object_as :log, model: "LocationLog"

  # == Attributes
  has_many :trail_markers, serializer: LocationTrailMarkerSerializer
end
