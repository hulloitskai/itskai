# typed: true
# frozen_string_literal: true

class ScottbotService < ApplicationService
  class << self
    # == Service
    sig { override.returns(T::Boolean) }
    def disabled?
      return !!@disabled if defined?(@disabled)
      @disabled = T.let(@disabled, T.nilable(T::Boolean))
      @disabled = [discord_token, discord_channel_id].any?(&:nil?) || super
    end

    # == Methods
    sig { params(type: Symbol).void }
    def alert(type)
      checked { instance.alert(type) }
    end

    # == Helpers
    sig { returns(T.nilable(String)) }
    def discord_token
      setting("DISCORD_TOKEN")
    end

    sig { returns(T.nilable(String)) }
    def discord_channel_id
      setting("DISCORD_CHANNEL_ID")
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
    return if disabled?
    @bot.run(true)
  end

  sig { override.void }
  def stop
    @bot.stop if started?
  end

  # == Method
  sig { params(signal: Symbol).void }
  def alert(signal)
    message = case signal
    when :break
      "`break;` – Scott is caught in an unproductive cycle and would like to " \
        "exit it!"
    when :rand
      "`rand()` – Scott wants to experience something new!"
    when :panic
      "`panic!` – Something has not gone to plan for Scott in a major way!"
    else
      raise "Unknown type: #{signal}"
    end
    send_message(message)
  end

  private

  # == Helpers
  sig { returns(String) }
  def discord_token
    self.class.discord_token or raise "Discord token not set"
  end

  sig { returns(String) }
  def discord_channel_id
    self.class.discord_channel_id or raise "Discord channel ID not set"
  end

  sig { params(message: String).void }
  def send_message(message)
    @bot.send_message(discord_channel_id, message)
  end
end
