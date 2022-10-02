# typed: strict
# frozen_string_literal: true

module Types
  class QueryType < Types::BaseObject
    extend T::Sig
    extend T::Helpers

    # == Relay ==
    # Add `node` and `nodes` fields.
    include GraphQL::Types::Relay::HasNodeField
    include GraphQL::Types::Relay::HasNodesField

    # == Fields ==
    field :test_field, resolver: Queries::TestField

    # field :viewer,
    #       Types::UserType,
    #       description: "The currently authenticated user."
  end
end
