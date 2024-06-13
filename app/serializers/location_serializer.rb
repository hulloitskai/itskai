# typed: true
# frozen_string_literal: true

class LocationSerializer < ApplicationSerializer
  # == Configuration
  object_as :log, model: "LocationLog"

  # == Attributes
  identifier
  attributes :timestamp, full_address: { as: :address, type: :string }

  # == Associations
  has_one :coordinates, serializer: CoordinatesSerializer
end
