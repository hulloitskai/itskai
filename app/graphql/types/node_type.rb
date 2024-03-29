# typed: strict
# frozen_string_literal: true

module Types
  module NodeType
    include BaseInterface

    # Add the `id` field.
    include GraphQL::Types::Relay::NodeBehaviors
  end
end
