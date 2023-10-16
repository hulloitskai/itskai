# typed: strict
# frozen_string_literal: true

# Load queries and listen to changes.
Rails.application.configure do
  config.after_initialize do
    puts "=> Loading queries" if Rails.server? # rubocop:disable Rails/Output, Layout/LineLength
    Schema.queries!.load

    if Rails.server?
      puts "=> Listening to query changes" # rubocop:disable Rails/Output, Layout/LineLength
      Schema.queries!.listen if Rails.env.development?
    end
  end
end

# Don't show noisy introspection query in logs.
GraphQL::RailsLogger.configure do |config|
  config.skip_introspection_query = true
end
