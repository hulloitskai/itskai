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
      client_id or raise "Google client ID not set"
    end

    sig { returns(T.nilable(String)) }
    def client_secret
      ENV["GOOGLE_CLIENT_SECRET"]
    end

    sig { returns(String) }
    def client_secret!
      client_secret or raise "Google client secret not set"
    end
  end
end
