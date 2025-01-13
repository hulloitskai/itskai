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

  # == Validations
  validates :text, presence: true
  validates :emoji, emoji: true, allow_nil: true

  # == Callbacks
  after_create_commit :notify_friends_later

  # == Noticeable
  sig { override.returns(String) }
  def notification_title
    "Kai shared with you"
  end

  sig { override.returns(String) }
  def notification_body
    [emoji, text].compact.join(" ")
  end

  # == Notify
  sig { params(friend_ids_to_alert: T::Array[String]).void }
  def notify_friends(friend_ids_to_alert: [])
    Friend.where(id: friend_ids_to_alert).select(:id).find_each do |friend|
      notifications.create!(friend:)
    end
    PushSubscription
      .where.associated(:friend)
      .where.not(friend_id: friend_ids_to_alert)
      .find_each(&:push)
  end

  sig { void }
  def notify_friends_later
    NotifyFriendsOfStatusJob.perform_later(self)
  end
end
