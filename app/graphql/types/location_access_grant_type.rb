# typed: strict
# frozen_string_literal: true

module Types
  class LocationAccessGrantType < BaseObject
    # == Interfaces
    implements NodeType

    # == Fields
    field :created_at, DateTimeType, null: false
    field :expires_at, DateTimeType, null: false
    field :recipient, String, null: false

    # == Helpers
    sig { override.returns(::LocationAccessGrant) }
    def object = super
  end
end
