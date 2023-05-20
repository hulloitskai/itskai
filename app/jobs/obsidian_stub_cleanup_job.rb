# typed: strict
# frozen_string_literal: true

class ObsidianStubCleanupJob < ApplicationJob
  # == Configuration
  good_job_control_concurrency_with(key: name, total_limit: 1)

  # == Callbacks
  around_perform :with_activity_logging

  # == Job
  sig { void }
  def perform
    ObsidianStub
      .where.missing(:incoming_relations)
      .find_each(&:destroy!)
  end

  private

  # == Callback Handlers
  sig { params(block: T.proc.void).void }
  def with_activity_logging(&block)
    ActivityService.update_status("Cleaning up stubs")
    yield
    ActivityService.update_status("Stub cleanup complete")
  end
end
