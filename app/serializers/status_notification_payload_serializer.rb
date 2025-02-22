# typed: true
# frozen_string_literal: true

class StatusNotificationPayloadSerializer < ApplicationSerializer
  # == Configuration
  object_as :payload

  # == Attributes
  identifier type: :string
  attributes text_snippet: { type: :string },
             emoji: { type: :string },
             friend_token: { type: :string }
end
