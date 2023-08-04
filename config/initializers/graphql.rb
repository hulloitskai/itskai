# typed: true
# frozen_string_literal: true

# Load queries and listen to changes.
Rails.application.configure do
  reloader.to_prepare do
    puts "=> Loading queries" if Rails.server? # rubocop:disable Rails/Output
    Schema.queries!.load
    Schema.queries!.listen if Rails.server? && Rails.env.development?
  end

  if Rails.server? && Rails.env.development?
    reloader.before_class_unload do
      Schema.queries!.unlisten
    end
  end
end

# Don't show noisy introspection query in logs.
GraphQL::RailsLogger.configure do |config|
  config.skip_introspection_query = true
end
