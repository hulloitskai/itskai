# typed: true
# frozen_string_literal: true

# rubocop:disable Layout/LineLength, Lint/RedundantCopDisableDirective
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

  # == Attributes
  sig { returns(String) }
  def text_snippet
    text.truncate(240)
  end

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
  sig do
    override
      .params(recipient: T.nilable(Friend))
      .returns(T::Hash[String, T.untyped])
  end
  def notification_payload(recipient)
    friend = recipient or raise "Missing recipient"
    payload = StatusNotificationPayload.new(status: self, friend:)
    StatusNotificationPayloadSerializer.one(payload)
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
