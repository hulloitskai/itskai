# typed: strict
# frozen_string_literal: true

class PensieveBot < ApplicationService
  include Singleton

  # == Constants
  MENTION_REGEXP = /^@(\w+) /

  # == Initialization
  sig { void }
  def initialize
    super
    @client = T.let(Pensieve.bot_client, T.nilable(Telegram::Bot::Client))
  end

  # == Attributes
  sig { returns(T.nilable(Telegram::Bot::Client)) }
  attr_reader :client

  sig { returns(Telegram::Bot::Client) }
  def client!
    @client or raise "Telegram client not initialized"
  end

  sig { returns(T.untyped) }
  def api!
    client!.api
  end

  # == Methods
  sig do
    params(
      text: String,
      reply_to_message_id: T.nilable(Integer),
    ).returns(Telegram::Bot::Types::Message)
  end
  def self.send_message(text, reply_to_message_id: nil)
    instance.api!.send_message(
      text:,
      chat_id: Pensieve.telegram_user_id!,
      reply_to_message_id:,
    )
  end

  sig { params(message_id: Integer).void }
  def self.like_message(message_id)
    instance.api!.set_message_reaction(
      chat_id: Pensieve.telegram_user_id!,
      message_id:,
      reaction: [ Telegram::Bot::Types::ReactionTypeEmoji.new(
        type: "emoji",
        emoji: "❤️",
      ) ],
    )
  end

  sig { params(message_id: Integer).void }
  def self.unlike_message(message_id)
    instance.api!.set_message_reaction(
      chat_id: Pensieve.telegram_user_id!,
      message_id:,
      reaction: [],
    )
  end

  sig do
    params(
      telegram_message: Telegram::Bot::Types::Message,
      bot: Telegram::Bot::Client,
    ).void
  end
  def self.receive_message(telegram_message, bot)
    if telegram_message.from.id != Pensieve.telegram_user_id!
      instance.api!.send_message(
        text: "Sorry, you have to be an allowlisted user to use this " \
          "pensieve 😅 (your user ID is: #{telegram_message.from.id})",
        chat_id: telegram_message.chat.id,
      ) and return
    end
    if (entity = telegram_message.entities&.first)
      return if entity.type == "bot_command"
    end
    message = PensieveMessage.find_or_initialize_by(
      telegram_chat_id: telegram_message.chat.id,
      telegram_message_id: telegram_message.message_id,
    ) do |message|
      message.from = :user
      message.timestamp = Time.zone.at(telegram_message.date)
    end
    edit_timestamp = if (edit_date = telegram_message.edit_date)
      Time.zone.at(edit_date)
    end
    text = T.let(telegram_message.text, String)
    to = if (match = MENTION_REGEXP.match(text))
      text.sub!(MENTION_REGEXP, "")
      match.captures.first!
    end
    text.strip!
    message.update!(to:, text:, edit_timestamp:)
  end
end
