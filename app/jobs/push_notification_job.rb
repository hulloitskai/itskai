# typed: strict
# frozen_string_literal: true

class PushNotificationJob < ApplicationJob
  # == Configuration
  good_job_control_concurrency_with(
    key: -> {
      T.bind(self, PushNotificationJob)
      notification, = arguments
      "#{self.class.name}(#{notification.to_gid})"
    },
    total_limit: 1,
  )

  # == Job
  sig { params(notification: Notification).void }
  def perform(notification)
    notification.push
  end
end
