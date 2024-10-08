# typed: true
# frozen_string_literal: true

require "sorbet-runtime"

module Admin
  extend T::Sig

  # == Accessors
  sig { returns(T::Array[String]) }
  def self.emails
    value = credentials.emails or return []
    case value
    when String
      [value]
    when Array
      value
    else
      raise "Invalid admin emails credential value: #{value.inspect}"
    end
  end

  sig { returns(T::Array[String]) }
  def self.email_domains
    value = credentials.email_domains or return []
    case value
    when String
      [value]
    when Array
      value
    else
      raise "Invalid admin email domains credential value: #{value.inspect}"
    end
  end

  # == Helpers
  sig { returns(T.untyped) }
  def self.credentials
    Rails.application.credentials.admin!
  end
end
