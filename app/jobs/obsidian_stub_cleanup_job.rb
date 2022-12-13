# typed: strict
# frozen_string_literal: true

class ObsidianStubCleanupJob < ApplicationJob
  extend T::Sig

  # == Configuration
  good_job_control_concurrency_with(key: name, total_limit: 1)

  sig { void }
  def perform
    ObsidianStub
      .where.missing(:incoming_relations)
      .find_each(&:destroy!)
  end
end
