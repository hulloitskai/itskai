# typed: true
# frozen_string_literal: true

module Google
  class << self
    extend T::Sig

    sig { returns(T.nilable(String)) }
    def client_id
      ENV["GOOGLE_CLIENT_ID"]
    end

    sig { returns(String) }
    def client_id!
      client_id or raise "Missing Google client ID"
    end

    sig { returns(T.nilable(String)) }
    def client_secret
      ENV["GOOGLE_CLIENT_SECRET"]
    end

    sig { returns(String) }
    def client_secret!
      client_secret or raise "Missing Google client secret"
    end
  end
end
