# typed: true
# frozen_string_literal: true

module Types
  class BaseObject < GraphQL::Schema::Object
    extend T::Sig
    extend T::Helpers

    include ActionPolicy::GraphQL::Behaviour
    include Resolver

    # == Configuration
    field_class Types::BaseField
    connection_type_class Types::BaseConnection
    edge_type_class Types::BaseEdge

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
