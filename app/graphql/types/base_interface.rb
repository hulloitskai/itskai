# typed: strict
# frozen_string_literal: true

module Types
  module BaseInterface
    extend T::Sig
    extend T::Helpers

    # == Definition
    include GraphQL::Schema::Interface

    # == Configuration
    field_class Types::BaseField
    connection_type_class Types::BaseConnection
    edge_type_class Types::BaseEdge
  end
end
