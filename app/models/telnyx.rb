# typed: strict
# frozen_string_literal: true

module Telnyx
  class << self
    extend T::Sig

    # == Accessors
    sig { returns(T.nilable(String)) }
    def api_key
      ENV["TELNYX_API_KEY"]
    end

    sig { returns(String) }
    def api_key!
      api_key or raise "Telnyx API key not set"
    end

    sig { returns(T.nilable(String)) }
    def app_id
      ENV["TELNYX_APP_ID"]
    end

    sig { returns(String) }
    def app_id!
      app_id or raise "Telnyx app ID not set"
    end

    sig { returns(T.nilable(String)) }
    def number
      return @number if defined?(@number)
      @number = T.let(@number, T.nilable(String))
      @number = if (number = ENV["TELNYX_NUMBER"])
        Phonelib.parse(number).to_s
      end
    end

    sig { returns(String) }
    def number!
      number or raise "Telnyx number not set"
    end
    end
end
