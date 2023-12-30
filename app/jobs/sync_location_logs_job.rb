# typed: strict
# frozen_string_literal: true

class SyncLocationLogsJob < ApplicationJob
  # == Configuration
  good_job_control_concurrency_with key: name, total_limit: 1

  # == Callbacks
  around_perform :with_activity_status

  # == Job
  sig { void }
  def perform
    LocationLog.sync!
  end

  # == Methods
  sig { returns(T::Boolean) }
  def self.enabled?
    ICloudClient.enabled?
  end

  private

  # == Callback Handlers
  sig { params(block: T.proc.void).void }
  def with_activity_status(&block)
    ActivityStatus.current = "Syncing location"
    yield
    ActivityStatus.current = "Location synced"
  end
end
