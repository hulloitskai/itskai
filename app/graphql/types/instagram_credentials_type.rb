# typed: strict
# frozen_string_literal: true

module Types
  class InstagramCredentialsType < BaseObject
    # == Interfaces
    implements NodeType

    # == Fields
    field :password, String, null: false
    field :session, GraphQL::Types::JSON
    field :username, String, null: false
  end
end
