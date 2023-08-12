# typed: true
# frozen_string_literal: true

module Subscriptions
  class ActivityStatus < BaseSubscription
    # == Configuration
    broadcastable true

    # == Type
    type String, null: true

    # == Callbacks
    sig { returns(T.nilable(String)) }
    def subscribe
      ::ActivityStatus.current
    end
  end
end
