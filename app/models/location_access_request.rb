# typed: strict
# frozen_string_literal: true

class LocationAccessRequest < ApplicationModel
  # == Attributes
  attribute :password, :string

  # == Validations
  validates :password, presence: true

  sig { returns(String) }
  def password!
    password or raise "Missing password"
  end
end
