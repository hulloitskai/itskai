# typed: true
# frozen_string_literal: true

class StatusNotifyFriendsParameters < ApplicationParameters
  # == Attributes
  attribute :friend_ids_to_alert, array: true, default: -> { [] }
end
