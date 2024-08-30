# typed: strict
# frozen_string_literal: true

class AnalyzeObsidianNotesJob < ApplicationJob
  # == Configuration
  good_job_control_concurrency_with key: name, total_limit: 1

  # == Job
  sig { params(force: T::Boolean).void }
  def perform(force: false)
    options = { force: }
    ObsidianNote.analyze(**options.compact)
  end
end
