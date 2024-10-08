# typed: strict
# frozen_string_literal: true

class CleanupObsidianStubsJob < ApplicationJob
  # == Configuration
  good_job_control_concurrency_with key: name, total_limit: 1
  queue_with_priority 10

  # == Job
  sig { void }
  def perform
    ObsidianStub.cleanup
  end
end
