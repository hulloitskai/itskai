# typed: strict
# frozen_string_literal: true

module Types
  class BaseConnection < GraphQL::Types::Relay::BaseConnection
    extend T::Sig
    extend T::Helpers

    # == Configuration
    edges_nullable false
    edge_nullable false
    node_nullable false

    # == Fields
    field :total_count, Integer, null: false

    # == Resolvers
    sig { returns(Integer) }
    def total_count
      object.items.size
    end
  end
end
