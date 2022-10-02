# typed: strict
# frozen_string_literal: true

module Subscriptions
  class TestSubscription < BaseSubscription
    extend T::Sig

    @value = T.let(1, Integer)

    class << self
      extend T::Sig

      sig { returns(Integer) }
      def increment!
        @value += 1
      end
    end

    # == Configuration ==
    type Int
    broadcastable true

    # == Callbacks ==
    sig { returns(Integer) }
    def subscribe
      self.class.increment!
    end

    sig { returns(Integer) }
    def update
      self.class.increment!
    end
  end
end
