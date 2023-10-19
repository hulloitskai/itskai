# typed: strict
# frozen_string_literal: true

require "sorbet-runtime"

module Owner
  extend T::Sig

  # == Accessors
  sig { returns(T.nilable(String)) }
  def self.email
    ENV["OWNER_EMAIL"]
  end

  sig { returns(String) }
  def self.email!
    email or raise "Owner email not set"
  end

  sig { returns(T.nilable(String)) }
  def self.phone
    ENV["OWNER_PHONE"]
  end

  sig { returns(String) }
  def self.phone!
    phone or raise "Owner phone number not set"
  end
end
