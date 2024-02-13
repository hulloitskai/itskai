# typed: strict
# frozen_string_literal: true

module Types
  class OAuthConnectionType < BaseObject
    # == Fields
    field :credentials, OAuthCredentialsType, authorize_field: true
    field :status, OAuthConnectionStatusType, null: false

    # == Helpers
    sig { returns(OAuthConnection) }
    def object = super
  end
end
