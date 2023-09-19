# typed: strict
# frozen_string_literal: true

module Types
  class CoordinatesType < BaseObject
    # == Fields
    field :latitude, Integer, null: false
    field :longitude, Integer, null: false
  end
end
