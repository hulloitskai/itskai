# typed: strict
# frozen_string_literal: true

class PensieveBot
  extend T::Sig
  include Singleton
  include Logging

  # == Constants
  MENTION_REGEXP = /^@(\w+) /

  # == Initialization
  sig { void }
  def initialize
    @client = T.let(Telegram::Bot::Client.new(Pensieve.bot_token!),
                    Telegram::Bot::Client)
    @thread = T.let(nil, T.nilable(Thread))
  end

  # == Running
  sig { void }
  def start
    @thread ||= Thread.new do
      @client.run do |bot|
        bot = T.let(bot, Telegram::Bot::Client)
        bot.listen do |message|
          Rails.application.reloader.wrap do
            handle_message!(message, bot)
          end
        end
      end
    end
  end

  sig { void }
  def self.start
    instance.start
  end

  sig { void }
  def stop
    if @thread
      @thread.kill if @thread.status
      @thread = nil
    end
  end

  sig { void }
  def self.stop
    instance.stop
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
      chat_id: Pensieve.telegram_user_id!,
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
    instance.send_message(text, reply_to_message_id:)
  end

  private

  sig do
    params(
      telegram_message: Telegram::Bot::Types::Message,
      bot: Telegram::Bot::Client,
    ).void
  end
  def handle_message!(telegram_message, bot)
    if telegram_message.from.id != Pensieve.telegram_user_id!
      bot.api.send_message(
        chat_id: telegram_message.chat.id,
        text:
          "Sorry, you have to be an allowlisted user to use this " \
          "pensieve 😅 (your user ID is: #{telegram_message.from.id})",
      ) and return
    end
    if (entity = telegram_message.entities&.first)
      return if entity.type == "bot_command"
    end
    tag_logger do
      logger.info("Received message: #{telegram_message.text}")
    end
    message = PensieveMessage.find_or_initialize_by(
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
