# typed: strict
# frozen_string_literal: true

class SendPensieveMessageLikeNotificationJob < ApplicationJob
  # == Configuration
  good_job_control_concurrency_with(
    key: -> {
      T.bind(self, SendPensieveMessageLikeNotificationJob)
      like, = arguments
      "#{self.class.name}(#{like.to_gid})"
    },
    total_limit: 1,
  )

  # == Job
  sig { params(like: PensieveMessageLike).void }
  def perform(like)
    like.send_notification_and_update_reaction
  end
end
