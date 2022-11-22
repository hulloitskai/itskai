# typed: strict
# frozen_string_literal: true

class ActiveStorage::CleanupJob < ApplicationJob
  extend T::Sig

  # == Configuration ==
  queue_as :low_priority
  good_job_control_concurrency_with enqueue_limit: 1, perform_limit: 1

  sig { void }
  def perform
    ActiveStorage::Blob
      .unattached
      .where("active_storage_blobs.created_at <= ?", 2.days.ago)
      .find_each(&:purge_later)
  end
end
