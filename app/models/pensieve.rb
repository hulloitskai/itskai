# typed: strict
# frozen_string_literal: true

class Pensieve
  class << self
    extend T::Sig

    # == Accessors
    sig { returns(T.nilable(String)) }
    def bot_token
      ENV["PENSIEVE_BOT_TOKEN"]
    end

    sig { returns(String) }
    def bot_token!
      bot_token or raise "Pensieve bot token not set"
    end

    sig { returns(T.nilable(Integer)) }
    def telegram_user_id
      @telegram_user_id ||= T.let(
        ENV["PENSIEVE_TELEGRAM_USER_ID"].presence&.to_i,
        T.nilable(Integer),
      )
    end

    sig { returns(Integer) }
    def telegram_user_id!
      telegram_user_id or raise "Pensieve telegram user ID not set"
    end

    # == Methods
    sig { void }
    def start_bot
      PensieveBot.start
    end

    sig { void }
    def stop_bot
      PensieveBot.stop
    end
  end
end
