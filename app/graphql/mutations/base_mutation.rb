# typed: strict
# frozen_string_literal: true

module Mutations
  class BaseMutation < GraphQL::Schema::RelayClassicMutation
    extend T::Sig
    extend T::Helpers

    # == Modules
    include ActionPolicy::GraphQL::Behaviour
    include Resolver

    # == Configuration
    object_class Types::BaseObject
    field_class Types::BaseField
    input_object_class Types::BaseInputObject
    argument_class Types::BaseArgument
    null false

    # == Resolver
    sig { override.params(kwargs: T.untyped).returns(T.untyped) }
    def resolve(**kwargs)
      ActiveRecord::Base.transaction do
        result = kwargs.any? ? super(**kwargs) : super()
        result.is_a?(T::Struct) ? result.serialize : result
      end
    end
  end
end
