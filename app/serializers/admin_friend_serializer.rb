# typed: true
# frozen_string_literal: true

class AdminFriendSerializer < ApplicationSerializer
  # == Attributes
  attributes token: { type: :string }

  # == Associations
  flat_one :friend, serializer: FriendSerializer
  has_one :latest_vibecheck,
          serializer: FriendVibecheckSerializer,
          nullable: true
end
