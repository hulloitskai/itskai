# typed: strict
# frozen_string_literal: true

module Subscriptions
  class Location < BaseSubscription
    # == fields
    type Types::LocationLogType, null: true

    # == Callback Handlers
    sig { returns(T.nilable(::LocationLog)) }
    def subscribe
      ::Location.current
    end
  end
end
