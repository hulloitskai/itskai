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
  include Identifiable

  # == Attributes
  attribute :token, default: -> { Devise.friendly_token }
  alias_attribute :timestamp, :created_at

  # == Associations
  belongs_to :grant, class_name: "LocationAccessGrant", inverse_of: :accesses

  sig { returns(LocationAccessGrant) }
  def grant!
    grant or raise ActiveRecord::RecordNotFound, "Missing grant"
  end

  # == Scopes
  scope :valid, -> { joins(:grant).merge(LocationAccessGrant.valid) }

  # == Callbacks
  after_create_commit :send_notification

  private

  # == Callback handlers
  sig { void }
  def send_notification
    grant = grant!
    NotificationsBot.send_message(
      "Location accessed by #{grant.recipient} (pw: #{grant.password})",
    )
  end
end
