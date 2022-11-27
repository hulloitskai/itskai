# typed: strict
# frozen_string_literal: true

class ObsidianNoteSynchronizationJob < ApplicationJob
  extend T::Sig

  # == Configuration ==
  good_job_control_concurrency_with key: name, total_limit: 1

  sig { params(force: T::Boolean).void }
  def perform(force: false)
    Obsidian.synchronize_notes(force: force)
  end
end
