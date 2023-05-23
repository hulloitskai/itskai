# typed: strict
# frozen_string_literal: true

require "active_record/connection_adapters/postgresql_adapter"
require "active_support/testing/stream"
require "sprockets/rails/task"
require "rails/all"
require "rails/generators"
require "rails/generators/app_base"

# Initialize application.
Rails.application.initialize!
