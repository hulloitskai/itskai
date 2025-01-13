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
  validate :validate_emoji

  # == Callbacks
  after_create_commit :notify_friends_later

  # == Noticeable
  sig { override.returns(String) }
  def notification_title
    "Kai shared a note"
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

  private

  # == Validators
  # Validate that `emoji' is either nil, or a single valid emoji.
  sig { void }
  def validate_emoji
    emoji = T.let(self[:emoji], T.nilable(String))
    if emoji
      unless (matches = emoji.match(Unicode::Emoji::REGEX)) &&
          (matches.length == 1) &&
          (only_match = matches[0]) &&
          (only_match.length == emoji.length)
        errors.add(:emoji, :invalid)
      end
    end
  end
end
