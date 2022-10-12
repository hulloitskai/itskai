# typed: strict
# frozen_string_literal: true

module Subscriptions
  class TestSubscription < BaseSubscription
    extend T::Sig

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

    # == Configuration ==
    type Int
    broadcastable true

    # == Callbacks ==
    sig { returns(Integer) }
    def subscribe
      self.class.increment!.tap do
        Schema.subscriptions.trigger(:test_subscription, {}, nil)
      end
    end

    sig { returns(Integer) }
    def update
      self.class.count
    end
  end
end
