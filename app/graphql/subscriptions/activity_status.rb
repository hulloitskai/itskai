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
      ::ActivityStatus.current if ::ActivityStatus.ready?
    end

    sig { returns(T.nilable(String)) }
    def update
      object
    end
  end
end
