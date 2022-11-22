# typed: strict
# frozen_string_literal: true

require "active_record/connection_adapters/postgresql_adapter"
require "active_support/testing/stream"
require "sprockets/rails/task"

# Initialize application.
Rails.application.initialize!
