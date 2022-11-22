# typed: strict
# frozen_string_literal: true

class ObsidianNoteSynchronizationJob < ApplicationJob
  extend T::Sig

  # == Configuration ==
  good_job_control_concurrency_with enqueue_limit: 1, perform_limit: 1

  sig { void }
  def perform
    Obsidian.synchronize
  end
end
