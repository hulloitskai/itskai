# typed: strict
# frozen_string_literal: true

module Subscriptions
  class TestSubscription < BaseSubscription
    # == Class variables
    @count = T.let(0, Integer)

    # == Configuration
    broadcastable true

    # == Type
    type Int

    # == Callback handlers
    sig { returns(Integer) }
    def subscribe
      self.class.increment!.tap do |count|
        Schema.subscriptions!.trigger(:test_subscription, {}, count)
      end
    end

    class << self
      extend T::Sig

      # == Class attributes
      sig { returns(Integer) }
      attr_reader :count

      # == Class methods
      sig { returns(Integer) }
      def increment!
        @count += 1
      end
    end
  end
end
