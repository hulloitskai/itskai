# typed: strict
# frozen_string_literal: true

# == Schema Information
#
# Table name: icloud_credentials
#
#  id         :uuid             not null, primary key
#  cookies    :text
#  email      :string           not null
#  password   :string           not null
#  session    :jsonb
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class ICloudCredentials < ApplicationRecord
  include Identifiable

  # == Attributes
  self.filter_attributes += %i[password cookies session]

  sig { returns(T.nilable(T::Hash[String, T.untyped])) }
  def session = super

  sig do
    params(value: T.nilable(T::Hash[String, T.untyped]))
      .returns(T.nilable(T::Hash[String, T.untyped]))
  end
  def session=(value)
    super
  end

  # == Validations
  validates :email,
            email: true,
            length: { maximum: 100 },
            presence: true
  validates :password, presence: true
  validate :validate_login, on: %i[create update]

  private

  # == Validators
  sig { void }
  def validate_login
    ICloudClient.from_credentials(self)
  rescue PyCall::PyError => error
    if error.type.__name__ == "PyiCloudFailedLoginException"
      errors.add(
        :base,
        :invalid,
        message: "invalid email or password",
      )
      false
    else
      raise
    end
  end
end
