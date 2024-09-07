# typed: true
# frozen_string_literal: true

class UserSerializer < ApplicationSerializer
  # == Attributes
  identifier
  attributes :email,
             :name,
             unconfirmed_email: {
               type: :string,
               nullable: true,
             },
             email_with_name: { type: :string },
             owner?: { as: :is_owner, type: :boolean }

  # == Associations
  has_one :avatar_blob, as: :avatar, serializer: ImageSerializer, nullable: true
end
