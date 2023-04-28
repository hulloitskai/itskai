# typed: true
# frozen_string_literal: true

class TestModel < ApplicationModel
  include GlobalID::Identification

  attribute :id, :string, default: -> { SecureRandom.uuid }
  validates :id, presence: true

  attribute :name, :string
  validates :name, presence: true, inclusion: { in: %w[George] }

  attribute :birthday, :date
end
