# typed: strict
# frozen_string_literal: true

require "sorbet-runtime"
require "telegram/bot"

module Notifications
  extend T::Sig

  # == Accessors
  sig { returns(T.nilable(String)) }
  def self.email
    ENV["NOTIFICATIONS_EMAIL"].presence
  end

  sig { returns(String) }
  def self.email!
    email or raise "Notifications email not set"
  end

  sig { returns(T.nilable(String)) }
  def self.bot_token
    ENV["NOTIFICATIONS_BOT_TOKEN"].presence
  end

  sig { returns(String) }
  def self.bot_token!
    bot_token or raise "Notifications bot token not set"
  end

  sig { returns(Telegram::Bot::Client) }
  def self.bot_client
    Telegram::Bot::Client.new(bot_token!)
  end

  sig { returns(T.nilable(Integer)) }
  def self.telegram_user_id
    @telegram_user_id ||= T.let(
      ENV["NOTIFICATIONS_TELEGRAM_USER_ID"].presence&.to_i,
      T.nilable(Integer),
    )
  end

  sig { returns(Integer) }
  def self.telegram_user_id!
    telegram_user_id or raise "Notifications telegram user ID not set"
  end
end
