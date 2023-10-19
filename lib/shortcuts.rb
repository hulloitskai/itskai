# typed: strict
# frozen_string_literal: true

require "sorbet-runtime"

module Shortcuts
  extend T::Sig

  # == Accessors
  sig { returns(T.nilable(String)) }
  def self.secret_key
    ENV["SHORTCUTS_SECRET_KEY"]
  end

  sig { returns(String) }
  def self.secret_key!
    secret_key or raise "Secret key not set"
  end
end
