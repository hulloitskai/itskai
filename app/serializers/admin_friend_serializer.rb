# typed: true
# frozen_string_literal: true

class AdminFriendSerializer < FriendSerializer
  # == Configuration
  object_as :friend

  # == Attributes
  attributes :token
end
