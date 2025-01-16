# typed: true
# frozen_string_literal: true

class AdminFriend < T::Struct
  # == Properties
  const :friend, Friend
  const :latest_vibecheck, T.nilable(FriendVibecheck)

  delegate :created_at, :token, to: :friend
end
