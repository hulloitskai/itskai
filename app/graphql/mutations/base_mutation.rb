# typed: strict
# frozen_string_literal: true

module Mutations
  class BaseMutation < GraphQL::Schema::RelayClassicMutation
    extend T::Sig
    extend T::Helpers

    # == Modules ==
    include ActionPolicy::GraphQL::Behaviour
    include Resolver

    # == Configuration ==
    object_class Types::BaseObject
    field_class Types::BaseField
    input_object_class Types::BaseInputObject
    argument_class Types::BaseArgument
    null false

    # == Resolver ==
    resolve_method :resolve_wrapper

    sig { params(args: T.untyped).returns(T.untyped) }
    def resolve_wrapper(**args)
      ActiveRecord::Base.transaction do
        return_value = args.any? ? resolve(**args) : resolve
        return_value.is_a?(T::Struct) ? return_value.serialize : return_value
      end
    end
  end
end
