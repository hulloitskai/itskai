# typed: true
# frozen_string_literal: true

require "sorbet-runtime"

module Admin
  extend T::Sig

  # == Accessors
  sig { returns(T::Array[String]) }
  def self.emails
    credentials.emails || []
  end

  sig { returns(T::Array[String]) }
  def self.email_domains
    credentials.email_domains || []
  end

  # == Helpers
  sig { returns(T.untyped) }
  def self.credentials
    Rails.application.credentials.admin!
  end
end
