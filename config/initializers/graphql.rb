# typed: strict
# frozen_string_literal: true

# Load queries and listen to changes.
Rails.application.configure do
  reloader.to_prepare do
    puts "=> Loading queries" if Rails.server? # rubocop:disable Rails/Output, Layout/LineLength
    Schema.queries!.load
    puts "=> Listening to queries" if Rails.server? # rubocop:disable Rails/Output, Layout/LineLength
    Schema.queries!.listen if Rails.server? && Rails.env.development?
  end

  reloader.before_class_unload do
    puts "=> Unlistening to queries" # rubocop:disable Rails/Output
    Schema.queries!.unlisten
  end if Rails.server? && Rails.env.development?
end

# Don't show noisy introspection query in logs.
GraphQL::RailsLogger.configure do |config|
  config.skip_introspection_query = true
end
