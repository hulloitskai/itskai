# typed: true
# frozen_string_literal: true

# rubocop:disable Layout/LineLength, Lint/RedundantCopDisableDirective
#
# == Schema Information
#
# Table name: pensieve_message_likes
#
#  id         :uuid             not null, primary key
#  created_at :datetime         not null
#  actor_id   :uuid             not null
#  message_id :uuid             not null
#
# Indexes
#
#  index_pensieve_message_likes_on_message_id  (message_id)
#  index_pensieve_message_likes_uniqueness     (message_id,actor_id) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (message_id => pensieve_messages.id)
#
# rubocop:enable Layout/LineLength
class PensieveMessageLike < ApplicationRecord
  # == Associations
  belongs_to :message, class_name: "PensieveMessage", touch: true
  counter_culture :message, column_name: "likes_count", touch: true

  sig { returns(PensieveMessage) }
  def message!
    message or raise ActiveRecord::RecordNotFound, "Missing message"
  end

  # == Callbacks
  after_create_commit :send_notification_and_set_reaction_later

  # == Methods
  sig { void }
  def send_notification_and_update_reaction
    PensieveBot.send_message(
      "Someone liked your message.",
      reply_to_message_id: message!.telegram_message_id,
    )
    PensieveBot.like_message(message!.telegram_message_id)
  end

  sig { void }
  def send_notification_and_set_reaction_later
    SendPensieveMessageLikeNotificationJob.perform_later(self)
  end
end
