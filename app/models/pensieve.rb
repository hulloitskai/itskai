# typed: true
# frozen_string_literal: true

class Pensieve
  include Logging

  class << self
    extend T::Sig

    # == Methods
    sig { returns(T.nilable(String)) }
    def bot_token
      ENV["PENSIEVE_BOT_TOKEN"]
    end

    sig { returns(String) }
    def bot_token!
      bot_token or raise "Pensieve bot token not set"
    end

    sig { returns(T.nilable(String)) }
    def telegram_user_id
      ENV["PENSIEVE_TELEGRAM_USER_ID"]
    end

    sig { returns(Integer) }
    def telegram_user_id!
      @telegram_user_id = T.let(@telegram_user_id, T.nilable(Integer))
      @telegram_user_id ||= scoped do
        user_id = telegram_user_id or raise "Pensieve telegram user ID not set"
        user_id.to_i
      end
    end

    sig { void }
    def run
      @run_thread = T.let(@run_thread, T.nilable(Thread))
      @run_thread ||= Thread.new do
        bot.run do |bot|
          bot = T.let(bot, Telegram::Bot::Client)
          bot.listen do |message|
            Rails.application.reloader.wrap do
              handle_message!(message, bot:)
            end
          end
        end
      end
    end

    sig { void }
    def stop
      if @run_thread
        @run_thread.kill if @run_thread.status
        @run_thread = nil
      end
    end

    sig { params(text: String).void }
    def send_message!(text)
      telegram_message = bot.api.send_message(text:, user_id: telegram_user_id!)
      telegram_message = T.let(telegram_message, Telegram::Bot::Types::Message)
      message = PensieveMessage.find_or_initialize_by(
        telegram_message_id: telegram_message.message_id,
      ) do |message|
        message.from = :bot
        message.timestamp = Time.zone.at(telegram_message.date)
      end
      message.update!(text: telegram_message.text)
    end

    private

    # == Helpers
    sig { returns(Telegram::Bot::Client) }
    def bot
      @bot = T.let(@bot, T.nilable(Telegram::Bot::Client))
      @bot ||= Telegram::Bot::Client.new(bot_token!)
    end

    sig do
      params(
        message: Telegram::Bot::Types::Message,
        bot: Telegram::Bot::Client,
      ).void
    end
    def handle_message!(message, bot:)
      if message.from.id != telegram_user_id!
        bot.api.send_message(
          chat_id: message.chat.id,
          text:
            "Sorry, you have to be an allowlisted user to use this " \
            "pensieve 😅 (your user ID is: #{message.from.id})",
        ) and return
      end
      if (entity = message.entities.first)
        return if entity.type == "bot_command"
      end
      tag_logger do
        logger.info("Received message: #{message.text}")
      end
      PensieveMessage.create!(
        telegram_message_id: message.message_id,
        from: :user,
        text: message.text,
        timestamp: Time.zone.at(message.date),
      )
    end
  end
end
