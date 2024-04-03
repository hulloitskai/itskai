# typed: strict
# frozen_string_literal: true

module Types
  class LocationAccessType < BaseObject
    # == Interfaces
    implements NodeType

    # == Fields
    field :grant, LocationAccessGrantType, null: false
    field :timestamp, DateTimeType, null: false
    field :token, String, null: false

    # == Helpers
    sig { override.returns(LocationAccess) }
    def object = super
  end
end
