# typed: true
# frozen_string_literal: true

module Types
  module NodeType
    # == Interface
    include Types::BaseInterface

    # == Modules
    # Add the 'id' field.
    include GraphQL::Types::Relay::NodeBehaviors
  end
end
