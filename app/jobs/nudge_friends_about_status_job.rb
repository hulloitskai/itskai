# typed: strict
# frozen_string_literal: true

class NudgeFriendsAboutStatusJob < ApplicationJob
  # == Configuration
  good_job_control_concurrency_with(
    key: -> {
      T.bind(self, NudgeFriendsAboutStatusJob)
      status, = arguments
      "#{self.class.name}(#{status.to_gid})"
    },
    total_limit: 1,
  )

  # == Job
  sig { params(status: Status).void }
  def perform(status)
    status.nudge_friends
  end
end
