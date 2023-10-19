# typed: strict
# frozen_string_literal: true

require "sorbet-runtime"

module Spotify
  extend T::Sig

  sig { returns(T.nilable(String)) }
  def self.client_id
    ENV["SPOTIFY_CLIENT_ID"]
  end

  sig { returns(String) }
  def self.client_id!
    client_id or raise "Spotify client ID not set"
  end

  sig { returns(T.nilable(String)) }
  def self.client_secret
    ENV["SPOTIFY_CLIENT_SECRET"]
  end

  sig { returns(String) }
  def self.client_secret!
    client_secret or raise "Spotify client secret not set"
  end
end
