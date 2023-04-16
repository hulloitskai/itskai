# typed: strict
# frozen_string_literal: true

class ObsidianStubCleanupJob < ApplicationJob
  extend T::Sig

  # == Configuration
  good_job_control_concurrency_with(key: name, total_limit: 1)

  # == Callbacks
  around_perform :with_activity_status

  # == Job
  sig { void }
  def perform
    ObsidianStub
      .where.missing(:incoming_relations)
      .find_each(&:destroy!)
  end

  private

  # == Callbacks
  sig { params(block: T.proc.void).void }
  def with_activity_status(&block)
    ActivityService.update_status("Cleaning up stubs")
    yield
    ActivityService.update_status("Stub cleanup complete")
  end
end
