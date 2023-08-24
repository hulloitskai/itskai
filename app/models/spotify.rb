# typed: true
# frozen_string_literal: true

module Spotify
  class << self
    extend T::Sig

    sig { returns(T.nilable(String)) }
    def client_id
      ENV["SPOTIFY_CLIENT_ID"]
    end

    sig { returns(String) }
    def client_id!
      client_id or raise "Spotify client ID not set"
    end

    sig { returns(T.nilable(String)) }
    def client_secret
      ENV["SPOTIFY_CLIENT_SECRET"]
    end

    sig { returns(String) }
    def client_secret!
      client_secret or raise "Spotify client secret not set"
    end
  end
end
