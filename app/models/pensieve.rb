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

    sig { void }
    def run
      @run_thread = T.let(@run_thread, T.nilable(Thread))
      @run_thread ||= Thread.new do
        bot.run do |bot|
          bot = T.let(bot, Telegram::Bot::Client)
          bot.listen do |message|
            message = T.let(message, Telegram::Bot::Types::Message)
            tag_logger do
              logger.info("Received message: #{message.text}")
            end
            message.text
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

    private

    # == Helpers
    sig { returns(Telegram::Bot::Client) }
    def bot
      @bot = T.let(@bot, T.nilable(Telegram::Bot::Client))
      @bot ||= Telegram::Bot::Client.new(bot_token!)
    end
  end
end
