# typed: strict
# frozen_string_literal: true

class LocationShowParams < ApplicationModel
  # == Attributes
  attribute :password, :string

  # == Validations
  validates :password, presence: true
end
