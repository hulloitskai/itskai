# typed: strict
# frozen_string_literal: true

module Notifications
  class << self
    extend T::Sig

    # == Accessors
    sig { returns(T.nilable(String)) }
    def email
      ENV["NOTIFICATIONS_EMAIL"]
    end

    sig { returns(String) }
    def email!
      email or raise "Notifications email not set"
    end

    sig { returns(T.nilable(String)) }
    def bot_token
      ENV["NOTIFICATIONS_BOT_TOKEN"]
    end

    sig { returns(String) }
    def bot_token!
      bot_token or raise "Notifications bot token not set"
    end

    sig { returns(T.nilable(Integer)) }
    def telegram_user_id
      @telegram_user_id ||= T.let(
        ENV["NOTIFICATIONS_TELEGRAM_USER_ID"].presence&.to_i,
        T.nilable(Integer),
      )
    end

    sig { returns(Integer) }
    def telegram_user_id!
      telegram_user_id or raise "Notifications telegram user ID not set"
    end
  end
end
