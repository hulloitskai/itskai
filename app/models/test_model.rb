# typed: true
# frozen_string_literal: true

class TestModel < ApplicationModel
  include GlobalID::Identification

  # == Attributes
  attribute :id, :string, default: -> { SecureRandom.uuid }
  attribute :name, :string
  attribute :birthday, :date

  # == Validations
  validates :name, presence: true, inclusion: { in: %w[George] }
  validates :id, presence: true
end
