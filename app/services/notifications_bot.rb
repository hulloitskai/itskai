# typed: strict
# frozen_string_literal: true

class NotificationsBot
  extend T::Sig
  include Singleton
  include Logging

  # == Constants
  MENTION_REGEXP = /^@(\w+) /

  # == Initialization
  sig { void }
  def initialize
    @client = T.let(Telegram::Bot::Client.new(Notifications.bot_token!),
                    Telegram::Bot::Client)
  end

  # == Methods
  sig do
    params(
      text: String,
      reply_to_message_id: T.nilable(Integer),
    ).returns(Telegram::Bot::Types::Message)
  end
  def send_message(text, reply_to_message_id: nil)
    response = @client.api.send_message(
      text:,
      chat_id: Notifications.telegram_user_id!,
      reply_to_message_id:,
    )
    if response["ok"] != true
      raise "Failed to send message: #{response}"
    end
    Telegram::Bot::Types::Message.new(response["result"])
  end

  sig do
    params(text: String, reply_to_message_id: T.nilable(Integer))
      .returns(Telegram::Bot::Types::Message)
  end
  def self.send_message(text, reply_to_message_id: nil)
    instance.send_message(text.downcase, reply_to_message_id:)
  end
end
