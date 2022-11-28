# typed: strict
# frozen_string_literal: true

class ApplicationJob < ActiveJob::Base
  # == Modules
  include GoodJob::ActiveJobExtensions::Concurrency

  # == Configuration
  # Automatically retry jobs that encountered a deadlock
  retry_on ActiveRecord::Deadlocked

  # Most jobs are safe to ignore if the underlying records are no longer
  # available
  discard_on ActiveJob::DeserializationError
end
