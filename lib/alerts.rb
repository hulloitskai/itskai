# typed: true
# frozen_string_literal: true

require "sorbet-runtime"
require "telegram/bot"

module Alerts
  extend T::Sig

  # == Accessors
  sig { returns(String) }
  def self.bot_token
    credentials.bot_token!
  end

  sig { returns(Telegram::Bot::Client) }
  def self.bot_client
    Telegram::Bot::Client.new(bot_token)
  end

  sig { returns(Integer) }
  def self.telegram_user_id
    credentials.telegram_user_id!
  end

  # == Helpers
  sig { returns(T.untyped) }
  def self.credentials
    Rails.application.credentials.alerts!
  end
end
