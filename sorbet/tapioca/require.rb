# typed: strict
# frozen_string_literal: true

require "active_record/connection_adapters/postgresql_adapter"
require "active_support/testing/stream"
require "rails/all"
require "rails/generators"
require "rails/generators/app_base"
require "geocoder/results/nominatim"
require "geocoder/results/here"
require "tapioca/dsl/compilers/active_record_relations"
require "tapioca/dsl/helpers/active_record_constants_helper"
require "bundler/audit/task"

# Initialize application.
Rails.application.initialize!
