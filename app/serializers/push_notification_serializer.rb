# typed: true
# frozen_string_literal: true

class PushNotificationSerializer < NotificationSerializer
  # == Configuration
  object_as :notification

  # == Attributes
  attributes :delivery_token
end
