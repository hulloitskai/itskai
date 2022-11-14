# typed: strict
# frozen_string_literal: true

module Types
  class UserType < Types::BaseObject
    # == Interfaces ==
    implements GraphQL::Types::Relay::Node

    # == ID ==
    global_id_field :id

    # == Fields ==
    field :email, String, null: false
    field :name, String, null: false
  end
end
