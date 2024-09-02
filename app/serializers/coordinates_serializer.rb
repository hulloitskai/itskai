# typed: true
# frozen_string_literal: true

class CoordinatesSerializer < ApplicationSerializer
  # == Attributes
  attributes x: { as: :longitude, type: :number },
    y: { as: :latitude, type: :number }
end
