# typed: strict
# frozen_string_literal: true

# Load queries and listen to changes.
Rails.application.configure do
  config.to_prepare do
    if Rails.const_defined?(:Server)
      puts "=> Loading queries" # rubocop:disable Rails/Output
    end
    Schema.queries!.load
  end

  if Rails.env.development?
    config.after_initialize { Schema.queries!.listen }
    at_exit { Schema.queries!.unlisten }
  end
end

# Don't show noisy introspection query in logs.
GraphQL::RailsLogger.configure do |config|
  config.skip_introspection_query = true
end
