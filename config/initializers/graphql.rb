# typed: strict
# frozen_string_literal: true

require "graphql_ext"

GraphQL::RailsLogger.configure do |config|
  config.skip_introspection_query = true
end
