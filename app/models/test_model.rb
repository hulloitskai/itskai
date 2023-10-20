# typed: strict
# frozen_string_literal: true

class TestModel < ApplicationModel
  include GlobalID::Identification

  # == Attributes
  attribute :id, :string, default: -> { SecureRandom.uuid }
  attribute :name, :string
  attribute :birthday, :date

  # == Validations
  validates :name, inclusion: { in: %w[George] }, presence: true
  validates :id, presence: true
end
