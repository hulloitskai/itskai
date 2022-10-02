# typed: strict
# frozen_string_literal: true

module Types
  module BaseInterface
    extend T::Sig
    extend T::Helpers

    include GraphQL::Schema::Interface

    field_class Types::BaseField
    connection_type_class Types::BaseConnection
    edge_type_class Types::BaseEdge

    sig do
      params(
          args: T.untyped,
          kwargs: T.untyped,
          block: T.nilable(T.proc.bind(Types::BaseField).void),
        )
        .returns(T.untyped)
    end
    def self.field(*args, **kwargs, &block)
      super
    end
  end
end
