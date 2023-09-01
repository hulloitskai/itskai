# typed: strict
# frozen_string_literal: true

class ImportLocationLogsJob < ApplicationJob
  # == Configuration
  good_job_control_concurrency_with key: name, total_limit: 1

  # == Callbacks
  around_perform :with_activity_status

  # == Job
  sig { void }
  def perform
    LocationLog.import!
  end

  private

  # == Callback Handlers
  sig { params(block: T.proc.void).void }
  def with_activity_status(&block)
    ActivityStatus.current = "Importing location logs"
    yield
    ActivityStatus.current = "Location logs imported"
  end
end
