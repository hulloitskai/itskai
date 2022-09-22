# typed: strict
# frozen_string_literal: true

require "active_record/connection_adapters/postgresql_adapter"
require "active_support/testing/stream"

# Eager-load and initialize application.
Rails.application.eager_load!
Rails.application.initialize!
