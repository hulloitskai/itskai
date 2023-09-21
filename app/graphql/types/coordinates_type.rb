# typed: strict
# frozen_string_literal: true

module Types
  class CoordinatesType < BaseObject
    # == Fields
    field :latitude, Float, null: false
    field :longitude, Float, null: false
  end
end
