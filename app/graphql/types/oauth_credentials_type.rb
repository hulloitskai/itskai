# typed: true
# frozen_string_literal: true

module Types
  class OAuthCredentialsType < BaseObject
    # == Interfaces
    implements NodeType

    # == Fields
    field :access_token, String
    field :name, String, null: false
    field :refresh_token, String
    field :uid, String, null: false
  end
end

# == Sorbet
module Types
  class OAuthCredentialsType
    # == Annotations
    sig { returns(OAuthCredentials) }
    def object
      super
    end
  end
end
