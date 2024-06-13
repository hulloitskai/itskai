# typed: true
# frozen_string_literal: true

class PasswordStrengthCheckParams < ApplicationModel
  # == Attributes
  attribute :password, :string

  sig { returns(String) }
  def password!
    password or raise "Missing password"
  end

  # == Validations
  validates :password, presence: true
end
