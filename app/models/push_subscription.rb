# typed: true
# frozen_string_literal: true

# rubocop:disable Layout/LineLength, Lint/RedundantCopDisableDirective
#
# == Schema Information
#
# Table name: push_subscriptions
#
#  id         :uuid             not null, primary key
#  auth_key   :string           not null
#  endpoint   :string           not null
#  p256dh_key :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  friend_id  :uuid
#
# Indexes
#
#  index_push_subscriptions_on_endpoint   (endpoint) UNIQUE
#  index_push_subscriptions_on_friend_id  (friend_id)
#
# Foreign Keys
#
#  fk_rails_...  (friend_id => friends.id)
#
# rubocop:enable Layout/LineLength, Lint/RedundantCopDisableDirective
class PushSubscription < ApplicationRecord
  # == Associations
  belongs_to :friend, optional: true

  # == Validations
  validates :endpoint,
            presence: true,
            uniqueness: { message: "already registered" }

  # == Methods
  sig { params(notification: Notification).void }
  def push(notification)
    notification = PushNotificationSerializer.one(notification)
    message = { notification: }
    push_message(message.to_json)
    notification.mark_as_pushed
  end

  sig { params(message: String).void }
  def push_message(message)
    response = WebPush.payload_send(
      endpoint:,
      p256dh: p256dh_key,
      auth: auth_key,
      vapid: vapid_credentials,
      message:,
    )
    with_log_tags do
      logger.info("Sent web push: #{response.inspect}")
    end
  rescue WebPush::ExpiredSubscription, WebPush::InvalidSubscription => error
    message = error.response.body
    with_log_tags do
      logger.warn("Bad subscription: #{message}")
    end
    destroy or with_log_tags do
      logger.error("Failed to destroy expired or invalid subscription")
    end
  rescue WebPush::ResponseError => error
    message = error.response.body
    with_log_tags do
      logger.error("Web push error: #{message}")
    end
  end

  sig { void }
  def send_test_notification
    message = {
      notification: {
        delivery_token: "test",
        title: "Test notification",
        body:
          "This is a test notification. If you are seeing this, then your " \
          "push notifications are working!",
        action_url: Rails.application.routes.url_helpers.admin_settings_path,
      },
    }
    push_message(message.to_json)
  end

  private

  # == Helpers
  sig { returns(T.untyped) }
  def web_push_credentials
    Rails.application.credentials.web_push!
  end

  sig { returns({ private_key: String, public_key: String }) }
  def vapid_credentials
    private_key = T.let(web_push_credentials.private_key!, String)
    public_key = T.let(web_push_credentials.public_key!, String)
    { private_key:, public_key: }
  end
end
