# typed: true
# frozen_string_literal: true

class CleanupObsidianStubsJob < ApplicationJob
  # == Configuration
  good_job_control_concurrency_with key: name, total_limit: 1

  # == Callbacks
  around_perform :with_status

  # == Job
  sig { void }
  def perform
    ObsidianStub.cleanup
  end

  private

  # == Callback handlers
  sig { params(block: T.proc.void).void }
  def with_status(&block)
    Activity.status = "Cleaning up Obsidian stubs"
    yield
    Activity.status = "Obsidian stub cleanup complete"
  end
end
