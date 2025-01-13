# typed: true
# frozen_string_literal: true

class StatusNotifyFriendsParameters < ApplicationParameters
  # == Attributes
  attribute :friend_ids, array: true, default: -> { [] }
end
