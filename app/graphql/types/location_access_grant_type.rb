# typed: strict
# frozen_string_literal: true

module Types
  class LocationAccessGrantType < BaseObject
    # == Interfaces
    implements NodeType

    # == Fields
    field :created_at, DateTimeType, null: false
    field :expires_at, DateTimeType, null: false
    field :locate_url, String, null: false
    field :password, String, null: false
    field :recipient, String, null: false

    # == Resolvers
    sig { returns(String) }
    def locate_url
      url_helpers.locate_url(password: object.password)
    end

    # == Helpers
    sig { override.returns(LocationAccessGrant) }
    def object = super
  end
end
