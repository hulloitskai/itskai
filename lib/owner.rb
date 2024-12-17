# typed: true
# frozen_string_literal: true

require "sorbet-runtime"

module Owner
  extend T::Sig

  # == Accessors
  sig { returns(String) }
  def self.email
    credentials.email!
  end

  sig { returns(T.nilable(ActiveSupport::TimeZone)) }
  def self.timezone
    ActiveSupport::TimeZone.new(credentials.timezone!)
  end

  # == Helpers
  sig { returns(T.untyped) }
  def self.credentials
    Rails.application.credentials.owner!
  end
end
