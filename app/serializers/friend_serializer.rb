# typed: true
# frozen_string_literal: true

class FriendSerializer < ApplicationSerializer
  # == Attributes
  identifier
  attributes :name, :emoji, notifiable?: { as: :notifiable, type: :boolean }
end
