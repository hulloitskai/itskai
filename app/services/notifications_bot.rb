# typed: strict
# frozen_string_literal: true

class NotificationsBot < ApplicationService
  include Singleton

  # == Initialization
  sig { void }
  def initialize
    super
    @client = T.let(Notifications.bot_client, Telegram::Bot::Client)
  end

  # == Attributes
  sig { returns(Telegram::Bot::Client) }
  attr_reader :client

  # == Methods
  sig do
    params(
      text: String,
      reply_to_message_id: T.nilable(Integer),
    ).returns(Telegram::Bot::Types::Message)
  end
  def self.send_message(text, reply_to_message_id: nil)
    instance.client.api.send_message(
      text:,
      chat_id: Notifications.telegram_user_id!,
      reply_to_message_id:,
    )
  end
end
