# typed: strong
# frozen_string_literal: true

module Types
  class BaseConnection < Types::BaseObject
    # Add `nodes` and `pageInfo` fields, as well as `edge_type(...)` and
    # `node_nullable(...)` overrides.
    include GraphQL::Types::Relay::ConnectionBehaviors
  end
end
