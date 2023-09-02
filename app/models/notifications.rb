# typed: strict
# frozen_string_literal: true

module Notifications
  class << self
    extend T::Sig

    # == Accessors
    sig { returns(T.nilable(String)) }
    def email
      ENV["NOTIFICATIONS_EMAIL"]
    end

    sig { returns(String) }
    def email!
      email or raise "Notifications email not set"
    end
  end
end
