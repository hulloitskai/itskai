# typed: strict
# frozen_string_literal: true

module Types
  class OAuthCredentialsType < BaseObject
    # == Interfaces
    implements NodeType

    # == Fields
    field :name, String, null: false
    field :refresh_token, String
    field :uid, String, null: false

    # == Helpers
    sig { override.returns(OAuthCredentials) }
    def object = super
  end
end
