# typed: strict
# frozen_string_literal: true

require "sorbet-runtime"

module Admin
  extend T::Sig

  # == Accessors
  sig { returns(T.nilable(String)) }
  def self.emails_expr
    ENV["ADMIN_EMAILS"]
  end

  sig { returns(T::Array[String]) }
  def self.emails
    @emails ||= T.let(
      if (expr = emails_expr)
        expr.split(",").select do |entry|
          entry.include?("@") && EmailValidator.valid?(entry)
        end
      else
        []
      end,
      T.nilable(T::Array[String]),
    )
  end

  sig { returns(T::Array[String]) }
  def self.email_domains
    @email_domains ||= T.let(
      if (expr = emails_expr)
        expr.split(",").select { |entry| entry.exclude?("@") }
      else
        []
      end,
      T.nilable(T::Array[String]),
    )
  end
end
