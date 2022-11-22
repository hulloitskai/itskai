# typed: strict
# frozen_string_literal: true

# Load queries and listen to changes.
Rails.application.configure do
  config.to_prepare { Schema.queries!.load }
  config.after_initialize { Schema.queries!.listen } if Rails.env.development?
end

# Don't show noisy introspection query in logs.
GraphQL::RailsLogger.configure do |config|
  config.skip_introspection_query = true
end
