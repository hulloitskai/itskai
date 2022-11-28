# typed: strict
# frozen_string_literal: true

module Types
  class ICloudCredentialsType < BaseObject
    # == Interfaces
    implements NodeType
    implements IdentifiableType

    # == Fields
    field :cookies, String
    field :email, String, null: false
    field :password, String, null: false
    field :session, GraphQL::Types::JSON
  end
end
