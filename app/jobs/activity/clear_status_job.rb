# typed: true
# frozen_string_literal: true

module Activity
  class ClearStatusJob < ApplicationJob
    # == Configuration
    queue_with_priority 1000

    # == Job
    sig { void }
    def perform
      Activity.clear_status
    end
  end
end
