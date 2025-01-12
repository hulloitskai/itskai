# typed: strict
# frozen_string_literal: true

class NotifyFriendsOfStatusJob < ApplicationJob
  # == Configuration
  good_job_control_concurrency_with(
    key: -> {
      T.bind(self, NotifyFriendsOfStatusJob)
      status, = arguments
      "#{self.class.name}(#{status.to_gid})"
    },
    total_limit: 1,
  )

  # == Job
  sig { params(status: Status).void }
  def perform(status)
    status.notify_friends
  end
end
