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
    "Heads up!"
  end

  sig { override.returns(String) }
  def notification_body
    [emoji, text].compact.join(" ")
  end

  # == Notify
  sig { params(with_notification: T::Boolean).void }
  def notify_friends(with_notification: false)
    if with_notification
      # Friend.find_each { |friend| notifications.create!(friend:) }
      # NOTE: Temporary, for testing purposes :)
      Friend.where("name ILIKE '%kai%'").find_each do |friend|
        notifications.create!(friend:)
      end
    else
      PushSubscription.where.associated(:friend).find_each(&:push)
    end
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
