# typed: strict
# frozen_string_literal: true

# == Schema Information
#
# Table name: location_access_grants
#
#  id              :uuid             not null, primary key
#  expires_at      :datetime         not null
#  password_digest :string           not null
#  recipient       :string           not null
#  created_at      :datetime         not null
#
class LocationAccessGrant < ApplicationRecord
  # == Attributes
  has_secure_password

  sig { returns(Time) }
  def expires_in
    expires_at - Time.current
  end

  sig do
    params(duration: ActiveSupport::Duration).returns(ActiveSupport::Duration)
  end
  def expires_in=(duration)
    self.expires_at = Time.current + duration
  end
end
