# typed: true
# frozen_string_literal: true

class ScottbotService < ApplicationService
  class << self
    # == Service
    sig { override.returns(T::Boolean) }
    def enabled?
      return !!@enabled if defined?(@enabled)
      @enabled = T.let(@enabled, T.nilable(T::Boolean))
      @enabled = T.must(super && discord_token.present?)
    end

    # == Methods
    sig { void }
    def stop = instance.stop

    sig { params(type: Symbol).void }
    def signal(type) = instance.signal(type)

    sig { returns(String) }
    def discord_token
      @discord_token = T.let(@discord_token, T.nilable(String))
      @discord_token ||= ENV.fetch("SCOTTBOT_DISCORD_TOKEN")
    end

    sig { returns(String) }
    def discord_channel_id
      @discord_channel_id = T.let(@discord_channel_id, T.nilable(String))
      @discord_channel_id ||= ENV.fetch("SCOTTBOT_DISCORD_CHANNEL_ID")
    end
  end

  # == Initialization
  sig { void }
  def initialize
    super
    @bot = Discordrb::Bot.new(
      token: discord_token,
      intents: [Discordrb::INTENTS[:server_messages]],
    )
  end

  sig { override.void }
  def start
    super
    bot.run(true)
  end

  sig { void }
  def stop
    bot.stop
  end

  # == Method
  sig { params(type: Symbol).void }
  def signal(type)
    message = case type
    when :break
      "`break;` – Scott is caught in an unproductive cycle and would like to " \
        "exit it!"
    when :rand
      "`rand()` – Scott wants to experience something new!"
    when :panic
      "`panic!` – Something has not gone to plan for Scott in a major way!"
    else
      raise "Unknown type: #{type}"
    end
    send_message(message)
  end

  private

  # == Attributes
  sig { returns(Discordrb::Bot) }
  attr_reader :bot

  # == Helpers
  sig { returns(String) }
  def discord_token = self.class.discord_token

  sig { returns(String) }
  def discord_channel_id = self.class.discord_channel_id

  sig { params(message: String).void }
  def send_message(message)
    bot.send_message(discord_channel_id, message)
  end
end
