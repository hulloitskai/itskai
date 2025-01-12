# typed: true
# frozen_string_literal: true

# rubocop:disable Layout/LineLength, Lint/RedundantCopDisableDirective
#
# == Schema Information
#
# Table name: location_accesses
#
#  id         :uuid             not null, primary key
#  token      :string           not null
#  created_at :datetime         not null
#  grant_id   :uuid             not null
#
# Indexes
#
#  index_location_accesses_on_grant_id  (grant_id)
#  index_location_accesses_on_token     (token) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (grant_id => location_access_grants.id)
#
# rubocop:enable Layout/LineLength, Lint/RedundantCopDisableDirective
class LocationAccess < ApplicationRecord
  include Noticeable

  # == Attributes
  attribute :token, default: -> { Devise.friendly_token }
  alias_attribute :timestamp, :created_at
  delegate :password, to: :grant!

  sig { returns(String) }
  def accessor
    grant!.recipient
  end

  # == Associations
  belongs_to :grant, class_name: "LocationAccessGrant", inverse_of: :accesses
  has_one :notification, as: :noticeable, dependent: :destroy

  sig { returns(LocationAccessGrant) }
  def grant!
    grant or raise ActiveRecord::RecordNotFound, "Missing grant"
  end

  # == Scopes
  scope :valid, -> { joins(:grant).merge(LocationAccessGrant.valid) }

  # == Callbacks
  after_create :create_notification!

  # == Noticeable
  sig { override.returns(String) }
  def notification_title = "Location accessed"

  sig { override.returns(String) }
  def notification_body
    "#{accessor} (pw: #{password}) accessed your location on " \
      "#{I18n.l(localized_timestamp, format: :short)}"
  end

  private

  # == Helpers
  sig { returns(ActiveSupport::TimeWithZone) }
  def localized_timestamp
    if (tz = Owner.timezone)
      created_at.in_time_zone(tz)
    else
      created_at
    end
  end
end
