# typed: strict
# frozen_string_literal: true

class TestModel < ApplicationModel
  attribute :id, :string, default: -> { SecureRandom.uuid }
  validates :id, presence: true

  attribute :name, :string
  validates :name, presence: true

  attribute :birthday, :date
end
