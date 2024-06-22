# typed: true
# frozen_string_literal: true

# rubocop:disable Layout/LineLength, Lint/RedundantCopDisableDirective
#
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
# rubocop:enable Layout/LineLength
class LocationAccessGrant < ApplicationRecord
  # == Attributes
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

  # == Associations
  has_many :accesses,
           class_name: "LocationAccess",
           inverse_of: :grant,
           dependent: :destroy

  # == Normalizations
  removes_blank :password

  # == Validations
  validates :password,
            format: {
              with: /\A[a-z0-9-]+\z/,
              message:
                "can only have lowercase letters, numbers, underscores, and " \
                "and dashes",
            },
            length: { minimum: 4 },
            allow_nil: true
  validate :validate_password_uniqueness

  # == Callbacks
  after_validation :set_default_password

  # == Scopes
  scope :valid, -> {
    T.bind(self, PrivateRelation)
    where("expires_at > NOW()")
  }

  private

  # == Validation handlers
  sig { void }
  def validate_password_uniqueness
    unless password.nil?
      if LocationAccessGrant.valid.exists?(password:)
        errors.add(:password, :uniqueness, message: "already being used")
      end
    end
  end

  # == Callback handlers
  sig { void }
  def set_default_password
    if password.nil?
      self.password = SecureRandom.alphanumeric(8)
    end
  end
end
