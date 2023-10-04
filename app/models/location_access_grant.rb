# typed: strict
# frozen_string_literal: true

# == Schema Information
#
# Table name: location_access_grants
#
#  id         :uuid             not null, primary key
#  expires_at :datetime         not null
#  password   :string           not null
#  recipient  :string           not null
#  created_at :datetime         not null
#
# Indexes
#
#  index_location_access_grants_on_password  (password)
#
class LocationAccessGrant < ApplicationRecord
  sig { returns(Time) }
  def expires_in
    expires_at - Time.current
  end

  sig do
    params(duration: ActiveSupport::Duration).returns(ActiveSupport::Duration)
  end
  def expires_in=(duration)
    self.expires_at = Time.current + duration
    duration
  end

  # == Validations
  validates :password,
            length: { minimum: 4 },
            format: {
              with: /\A[a-z0-9-]+\z/,
              message:
                "can only have lowercase letters, numbers, underscores, and " \
                "and dashes",
            }
  validate :validate_password_uniqueness

  # == Scopes
  scope :valid, -> {
    T.bind(self, PrivateRelation)
    where("expires_at > NOW()")
  }

  private

  # == Validation Handlers
  sig { void }
  def validate_password_uniqueness
    if self.class.valid.exists?(password:)
      errors.add(:password, :uniqueness, message: "already being used")
    end
  end
end
