# typed: true
# frozen_string_literal: true

# rubocop:disable Layout/LineLength, Lint/RedundantCopDisableDirective
#
# == Schema Information
#
# Table name: statuses
#
#  id         :uuid             not null, primary key
#  emoji      :string
#  text       :text             not null
#  created_at :datetime         not null
#
# Indexes
#
#  index_statuses_on_created_at  (created_at)
#
# rubocop:enable Layout/LineLength, Lint/RedundantCopDisableDirective
class Status < ApplicationRecord
  include Noticeable

  # == Associations
  has_many :notifications, as: :noticeable, dependent: :destroy

  # == Attachments
  has_one_attached :image

  # == Validations
  validates :text, presence: true
  validates :emoji, emoji: true, allow_nil: true

  # == Callbacks
  after_create_commit :nudge_friends_later

  # == Noticeable
  sig { override.returns(String) }
  def notification_title
    "Kai shared with you"
  end

  sig { override.returns(String) }
  def notification_body
    [emoji, text].compact.join(" ").truncate(240)
  end

  sig { override.params(notification: Notification).returns(T.nilable(String)) }
  def notification_action_url(notification)
    if (friend_token = Friend.where(id: notification.friend_id).pick(:token))
      Rails.application.routes.url_helpers.friend_url(
        friend_token:,
        status_id: id,
      )
    else
      Rails.application.routes.url_helpers.admin_statuses_url
    end
  end

  # == Notify
  sig { params(friend_ids: T::Array[String]).void }
  def notify_friends(friend_ids: [])
    transaction do
      Friend.where(id: friend_ids).select(:id).find_each do |friend|
        notifications.create!(friend:)
      end
    end
  end

  sig { void }
  def nudge_friends
    PushSubscription.where.associated(:friend).find_each do |subscription|
      payload = {
        badge: {
          count: 1,
        },
      }
      subscription.push_payload(payload)
    end
  end

  sig { void }
  def nudge_friends_later
    NudgeFriendsAboutStatusJob.perform_later(self)
  end
end
