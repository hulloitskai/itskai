# typed: strict
# frozen_string_literal: true

class TestModel < ApplicationModel
  include FormErrors

  # == Attributes
  attribute :name, :string
  attribute :birthday, :date

  # == Validations
  validates :name, inclusion: { in: %w[George] }, presence: true
end
