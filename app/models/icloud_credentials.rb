# typed: true
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
  sig { returns(ActiveSupport::TimeWithZone) }
  def updated_at!
    T.must(updated_at)
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
