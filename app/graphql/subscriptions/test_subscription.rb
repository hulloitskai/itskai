# typed: strict
# frozen_string_literal: true

module Subscriptions
  class TestSubscription < BaseSubscription
    # == Variables
    @count = T.let(0, Integer)

    # == Type
    type Int

    # == Callback Handlers
    sig { returns(Integer) }
    def subscribe
      self.class.increment!.tap do |count|
        Schema.subscriptions!.trigger(:test_subscription, {}, count)
      end
    end

    class << self
      extend T::Sig

      # == Attributes
      sig { returns(Integer) }
      attr_reader :count

      # == Methods
      sig { returns(Integer) }
      def increment!
        @count += 1
      end
    end
  end
end
