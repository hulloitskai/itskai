# typed: strict
# frozen_string_literal: true

module Types
  class BaseUnion < GraphQL::Schema::Union
    # == Configuration
    connection_type_class BaseConnection
    edge_type_class BaseEdge
  end
end
