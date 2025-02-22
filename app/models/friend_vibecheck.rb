# typed: true
# frozen_string_literal: true

# rubocop:disable Layout/LineLength, Lint/RedundantCopDisableDirective
# == Schema Information
#
# Table name: friend_vibechecks
#
#  id         :uuid             not null, primary key
#  vibe       :string           not null
#  created_at :datetime         not null
#  friend_id  :uuid             not null
#
# Indexes
#
#  index_friend_vibechecks_on_friend_id  (friend_id)
#
# Foreign Keys
#
#  fk_rails_...  (friend_id => friends.id)
#
# rubocop:enable Layout/LineLength, Lint/RedundantCopDisableDirective
class FriendVibecheck < ApplicationRecord
  include Noticeable

  # == Associations
  belongs_to :friend
  delegate :name, :emoji, to: :friend, prefix: true

  has_one :notification, as: :noticeable, dependent: :destroy

  sig { returns(Friend) }
  def friend!
    friend or raise ActiveRecord::RecordNotFound, "Friend not found"
  end

  # == Validations
  validates :vibe, presence: true, emoji: true

  # == Callbacks
  after_create :create_notification!

  # == Noticeable
  sig do
    override
      .params(recipient: T.nilable(Friend))
      .returns(T::Hash[String, T.untyped])
  end
  def notification_payload(recipient)
    FriendVibecheckNotificationPayloadSerializer.one(self)
  end
end
