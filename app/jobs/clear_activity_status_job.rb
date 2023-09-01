# typed: strict
# frozen_string_literal: true

class ClearActivityStatusJob < ApplicationJob
  # == Configuration
  queue_with_priority 1000

  # == Job
  sig { void }
  def perform
    ActivityStatus.clear
  end
end
