# typed: strict
# frozen_string_literal: true

# == Schema Information
#
# Table name: instagram_credentials
#
#  id         :uuid             not null, primary key
#  password   :string           not null
#  session    :jsonb
#  username   :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class InstagramCredentials < ApplicationRecord
  include Identifiable

  # == Attributes
  self.filter_attributes += %i[password session]

  sig { returns(T.nilable(T::Hash[String, T.untyped])) }
  def session = super

  sig do
    params(
      value: T.nilable(T::Hash[String, T.untyped]),
    ).returns(T.nilable(T::Hash[String, T.untyped]))
  end
  def session=(value)
    super
  end

  # == Validations
  validates :username,
            length: { maximum: 100 },
            presence: true
  validates :password, presence: true
  validate :validate_login, on: %i[create update]

  private

  # == Validators
  sig { void }
  def validate_login
    raise NotImplementedError, "should attempt to login with InstagramClient"
  end
end
