# typed: strict
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
  end
end
