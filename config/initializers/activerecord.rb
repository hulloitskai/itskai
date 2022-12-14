# typed: strict
# frozen_string_literal: true

require "active_record/connection_adapters/postgresql_adapter"

# Use TIMESTAMPTZ as native type for :datetime columns.
ActiveRecord::ConnectionAdapters::PostgreSQLAdapter.datetime_type = :timestamptz

# Clean up backtraces!
ActiveRecord::LogSubscriber.backtrace_cleaner =
  scoped do
    cleaner = ActiveSupport::BacktraceCleaner.new
    cleaner.add_silencer do |line|
      line.starts_with?(Rails.root.join("lib").to_s) &&
        line.ends_with?("_ext.rb")
    end
    cleaner.add_filter { |line| line.delete_prefix(Rails.root.to_s) }
    cleaner
  end

# Wait for database to start up in development.
if Rails.env.development?
  Rails.application.configure do
    if Rails.const_defined?(:Server)
      config.before_initialize do
        attempt = 1
        loop do
          message = "=> Connecting to database"
          message += " (attempt #{attempt})" if attempt > 1
          puts message # rubocop:disable Rails/Output
          break if suppress(ActiveRecord::ConnectionNotEstablished) do
            ActiveRecord::Base.connection
          end
          attempt += 1
          sleep(1)
        end
      end
    end
  end
end
