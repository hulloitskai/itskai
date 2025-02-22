# typed: true
# frozen_string_literal: true

class FriendVibecheckNotificationPayloadSerializer < ApplicationSerializer
  # == Configuration
  object_as :friend_vibecheck

  # == Attributes
  identifier
  attributes :vibe,
             friend_name: { type: :string },
             friend_emoji: { type: :string }
end
