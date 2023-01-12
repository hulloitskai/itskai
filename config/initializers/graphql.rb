# typed: strict
# frozen_string_literal: true

# Load queries and listen to changes.
Rails.application.configure do
  server = Rails.const_defined?(:Server)

  reloader.to_prepare do
    puts "=> Loading queries" if server # rubocop:disable Rails/Output
    Schema.queries!.load
    Schema.queries!.listen if server && Rails.env.development?
  end

  if server && Rails.env.development?
    reloader.before_class_unload do
      Schema.queries!.unlisten
    end
  end
end

# Don't show noisy introspection query in logs.
GraphQL::RailsLogger.configure do |config|
  config.skip_introspection_query = true
end
