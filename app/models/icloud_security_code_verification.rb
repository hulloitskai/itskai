# typed: true
# frozen_string_literal: true

class ICloudSecurityCodeVerification < ApplicationModel
  # == Attributes
  attribute :code, :string

  sig { returns(String) }
  def code!
    code or raise "Missing code"
  end

  # == Validations
  validates :code, presence: true
end
