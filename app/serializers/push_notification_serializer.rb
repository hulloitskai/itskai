# typed: true
# frozen_string_literal: true

class PushNotificationSerializer < ApplicationSerializer
  # == Configuration
  object_as :notification

  # == Attributes
  identifier
  attributes :delivery_token,
             :friend_id,
             title: { type: :string },
             body: { type: :string },
             action_url: { type: :string, nullable: true }

  attribute :icon_src, type: :string, nullable: true do
    if (blob = notification.icon_blob)
      Rails.application.routes.url_helpers
        .rails_representation_url(blob, resize_to_limit: [320, 320])
    end
  end
end
