# typed: strict
# frozen_string_literal: true

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
class PensieveMessageLike < ApplicationRecord
  # == Associations
  belongs_to :message, class_name: "PensieveMessage", touch: true

  sig { returns(PensieveMessage) }
  def message!
    message or raise ActiveRecord::RecordNotFound, "Missing message"
  end

  # == Callbacks
  after_create_commit :update_activity_status
  after_create_commit :send_notification_later

  # == Methods
  sig { void }
  def send_notification
    PensieveBot.send_message(
      "Someone liked your message.",
      reply_to_message_id: message!.telegram_message_id,
    )
  end

  sig { void }
  def send_notification_later
    SendPensieveMessageLikeNotificationJob.perform_later(self)
  end

  private

  # == Callback Handlers
  sig { void }
  def update_activity_status
    ActivityStatus.current = "Someone liked a message!"
  end
end
