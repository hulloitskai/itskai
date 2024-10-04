# typed: true
# frozen_string_literal: true

require "sorbet-runtime"

module Spotify
  extend T::Sig

  # == Accessors
  sig { returns(String) }
  def self.client_id
    credentials.client_id!
  end

  sig { returns(String) }
  def self.client_secret
    credentials.client_secret!
  end

  sig { returns(String) }
  def self.sp_dc
    credentials.sp_dc!
  end

  # == Helpers
  sig { returns(T.untyped) }
  def self.credentials
    Rails.application.credentials.spotify!
  end
end
