# typed: strict
# frozen_string_literal: true

require "graphql_ext"

# Preload queries unless code-reloading is enabled.
Rails.application.configure do
  config.to_prepare { Schema.queries!.preload } if config.cache_classes
end

# Don't show noisy introspection query in logs.
GraphQL::RailsLogger.configure do |config|
  config.skip_introspection_query = true
end
