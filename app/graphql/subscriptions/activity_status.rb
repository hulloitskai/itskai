# typed: strict
# frozen_string_literal: true

module Subscriptions
  class ActivityStatus < BaseSubscription
    extend T::Sig

    # == Configuration
    type String, null: true
    broadcastable true

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
