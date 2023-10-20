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

  # == Methods
  sig { params(password: String).returns(T.nilable(LocationAccessGrant)) }
  def self.for_password(password)
    valid.find_by(password:).tap do |grant|
      grant = T.let(grant, T.nilable(LocationAccessGrant))
      if grant
        NotificationsBot.send_message(
          "#{grant.recipient} accessed your location",
        )
      end
    end
  end

  private

  # == Validation Handlers
  sig { void }
  def validate_password_uniqueness
    unless password.nil?
      if self.class.valid.exists?(password:)
        errors.add(:password, :uniqueness, message: "already being used")
      end
    end
  end

  # == Callback Handlers
  sig { void }
  def set_default_password
    if password.nil?
      self.password = SecureRandom.alphanumeric(8)
    end
  end
end
