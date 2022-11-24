# typed: strict
# frozen_string_literal: true

module Types
  class ICloudCredentialsType < BaseObject
    # == Interfaces ==
    implements GraphQL::Types::Relay::Node

    # == Fields ==
    field :cookies, String
    field :email, String, null: false
    field :password, String, null: false
    field :session, GraphQL::Types::JSON
  end
end