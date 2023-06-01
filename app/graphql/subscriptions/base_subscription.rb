# typed: strict
# frozen_string_literal: true

module Subscriptions
  class BaseSubscription < GraphQL::Schema::Subscription
    extend T::Sig
    extend T::Helpers

    include ActionPolicy::GraphQL::Behaviour
    include Resolver

    # == Configuration
    argument_class Types::BaseArgument
    object_class Types::BaseObject
    field_class Types::BaseField

    # == Helpers
    sig do
      override.params(
        args: T.untyped,
        kwargs: T.untyped,
        block: T.nilable(T.proc.bind(Types::BaseField).void),
      ).returns(T.untyped)
    end
    def self.field(*args, **kwargs, &block) = super
  end
end
