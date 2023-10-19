# typed: strict
# frozen_string_literal: true

require "sorbet-runtime"

module Contact
  extend T::Sig

  # == Accessors
  sig { returns(T.nilable(String)) }
  def self.email
    ENV["CONTACT_EMAIL"]
  end

  sig { returns(String) }
  def self.email!
    email or raise "Contact email not set"
  end
end
