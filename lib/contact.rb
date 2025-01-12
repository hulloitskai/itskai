# typed: true
# frozen_string_literal: true

require "sorbet-runtime"

module Contact
  extend T::Sig

  # == Accessors
  sig { returns(String) }
  def self.email
    credentials.email!
  end

  sig { returns(String) }
  def self.phone
    credentials.phone!
  end

  # == Helpers
  sig { returns(T.untyped) }
  def self.credentials
    Rails.application.credentials.contact!
  end
end
