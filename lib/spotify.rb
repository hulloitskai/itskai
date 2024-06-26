# typed: true
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

  sig { returns(T.nilable(String)) }
  def self.sp_dc
    ENV["SPOTIFY_SP_DC"]
  end

  sig { returns(String) }
  def self.sp_dc!
    sp_dc or raise "Spotify SP DC not set"
  end
end
