# typed: strict
# frozen_string_literal: true

class CleanupObsidianStubsJob < ApplicationJob
  # == Configuration
  good_job_control_concurrency_with key: name, total_limit: 1

  # == Callbacks
  around_perform :with_activity_status

  # == Job
  sig { void }
  def perform
    ObsidianStub.cleanup
  end

  private

  # == Callback Handlers
  sig { params(block: T.proc.void).void }
  def with_activity_status(&block)
    ActivityStatus.current = "Cleaning up Obsidian stubs"
    yield
    ActivityStatus.current = "Obsidian stub cleanup complete"
  end
end
