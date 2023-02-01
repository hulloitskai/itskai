# typed: strict
# frozen_string_literal: true

module Subscriptions
  class TestSubscription < BaseSubscription
    @count = T.let(0, Integer)

    class << self
      extend T::Sig

      sig { returns(Integer) }
      attr_reader :count

      sig { returns(Integer) }
      def increment!
        @count += 1
      end
    end

    # == Configuration
    broadcastable true

    # == Type
    type Int

    # == Callbacks
    sig { returns(Integer) }
    def subscribe
      self.class.increment!.tap do |count|
        Schema.subscriptions!.trigger(:test_subscription, {}, count)
      end
    end
  end
end
