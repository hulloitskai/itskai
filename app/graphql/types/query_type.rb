# typed: strict
# frozen_string_literal: true

module Types
  class QueryType < BaseObject
    extend T::Sig
    extend T::Helpers

    # == Relay ==
    # Add 'node' and 'nodes' fields.
    include GraphQL::Types::Relay::HasNodeField
    include GraphQL::Types::Relay::HasNodesField

    # == Fields ==
    field :contact_email, resolver: Queries::ContactEmail
    field :resume, resolver: Queries::Resume
    field :test_echo, resolver: Queries::TestEcho
    field :viewer,
          resolver: Queries::Viewer,
          description: "The currently authenticated user."
  end
end
