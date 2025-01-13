# typed: true
# frozen_string_literal: true

# rubocop:disable Layout/LineLength, Lint/RedundantCopDisableDirective
#
# == Schema Information
#
# Table name: notifications
#
#  id              :uuid             not null, primary key
#  delivered_at    :datetime
#  delivery_token  :string           not null
#  noticeable_type :string           not null
#  pushed_at       :datetime
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  friend_id       :uuid
#  noticeable_id   :uuid             not null
#
# Indexes
#
#  index_notifications_on_friend_id   (friend_id)
#  index_notifications_on_noticeable  (noticeable_type,noticeable_id)
#
# Foreign Keys
#
#  fk_rails_...  (friend_id => friends.id)
#
# rubocop:enable Layout/LineLength, Lint/RedundantCopDisableDirective
class Notification < ApplicationRecord
  # == Attributes
  has_secure_token :delivery_token

  sig { returns(T::Boolean) }
  def pushed? = pushed_at?

  sig { returns(T::Boolean) }
  def delivered? = delivered_at?

  # == Associations
  belongs_to :noticeable, polymorphic: true
  belongs_to :friend, optional: true

  # == Callbacks
  after_create_commit :push_later

  # == Scopes
  scope :for_owner, -> { where(friend: nil) }
  scope :for_friends, -> { where.not(friend: nil) }

  # == Testing
  sig { returns(Notification) }
  def self.test
    new(noticeable: Alert.test)
  end

  # == Noticeable
  sig { returns(T.nilable(Noticeable)) }
  def noticeable
    super
  end

  sig { returns(Noticeable) }
  def noticeable!
    noticeable or raise ActiveRecord::RecordNotFound, "Missing noticeable"
  end

  sig { returns(String) }
  def title
    noticeable!.notification_title
  end

  sig { returns(T.nilable(String)) }
  def body
    noticeable!.notification_body
  end

  sig { returns(T.nilable(ActiveStorage::Blob)) }
  def icon_blob
    noticeable!.notification_icon_blob
  end

  sig { returns(T.nilable(String)) }
  def action_url
    noticeable!.notification_action_url
  end

  # == Methods
  sig { void }
  def push
    PushSubscription.where(friend:).find_each do |subscription|
      subscription.push(self)
    end
  end

  sig { void }
  def push_later
    PushNotificationJob.perform_later(self)
  end

  sig { void }
  def mark_as_pushed!
    update!(pushed_at: Time.current) unless pushed?
  end

  sig { void }
  def mark_as_delivered!
    update!(delivered_at: Time.current) unless delivered?
  end
end
