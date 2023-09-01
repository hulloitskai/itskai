# typed: strict
# frozen_string_literal: true

module Types
  class UserType < BaseObject
    # == Interfaces
    implements NodeType

    # == Fields
    field :avatar, ImageType, method: :avatar_blob
    field :email, String, null: false
    field :is_owner, Boolean, null: false, method: :owner?
    field :name, String, null: false
    field :unverified_email, String, method: :unconfirmed_email

    # == Helpers
    sig { override.returns(User) }
    def object = super
  end
end
