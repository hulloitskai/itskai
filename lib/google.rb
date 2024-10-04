# typed: true
# frozen_string_literal: true

require "sorbet-runtime"

module Google
  extend T::Sig

  sig { returns(String) }
  def self.client_id
    credentials.client_id!
  end

  sig { returns(String) }
  def self.client_secret
    credentials.client_secret!
  end

  # == Helpers
  sig { returns(T.untyped) }
  def self.credentials
    Rails.application.credentials.google!
  end
end
