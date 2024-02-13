# typed: strict
# frozen_string_literal: true

module Types
  class ICloudConnectionType < BaseObject
    # == Fields
    field :credentials, ICloudCredentialsType, authorize_field: true
    field :status, ICloudConnectionStatusType, null: false

    # == Helpers
    sig { returns(ICloudConnection) }
    def object = super
  end
end
