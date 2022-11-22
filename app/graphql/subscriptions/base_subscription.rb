# typed: strict
# frozen_string_literal: true

module Subscriptions
  class BaseSubscription < GraphQL::Schema::Subscription
    extend T::Sig

    # == Modules ==
    include ActionPolicy::GraphQL::Behaviour
    include Resolver

    # == Configuration ==
    argument_class Types::BaseArgument
    object_class Types::BaseObject
    field_class Types::BaseField
  end
end
