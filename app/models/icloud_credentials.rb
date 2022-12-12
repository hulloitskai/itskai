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
# Indexes
#
#  index_icloud_credentials_on_email  (email) UNIQUE
#

class ICloudCredentials < ApplicationRecord
  # == Configuration
  self.filter_attributes += %i[password cookies session]

  # == Concerns
  include Identifiable

  # == Attributes
  sig { returns(T.nilable(T::Hash[String, T.untyped])) }
  def session
    super
  end

  sig do
    params(value: T.nilable(T::Hash[String, T.untyped]))
      .returns(T.nilable(T::Hash[String, T.untyped]))
  end
  def setters=(value)
    super
  end

  # == Validations
  validates :email,
            presence: true,
            length: {
              maximum: 100,
            },
            email: true,
            uniqueness: {
              case_sensitive: false,
            }
  validates :password, presence: true
end
