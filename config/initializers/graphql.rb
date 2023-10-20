# typed: strict
# frozen_string_literal: true

require "graphql_ext"

# Don't show noisy introspection query in logs.
GraphQL::RailsLogger.configure do |config|
  config.skip_introspection_query = true
end
