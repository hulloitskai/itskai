# typed: true
# frozen_string_literal: true

class NotificationSerializer < ApplicationSerializer
  # == Attributes
  identifier
  attributes title: { type: :string },
             body: { type: :string },
             action_url: { type: :string, nullable: true },
             created_at: { as: :timestamp }

  # == Associations
  has_one :noticeable, serializer: NoticeableSerializer
end
