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
      line.start_with?(Rails.root.join("lib").to_s) &&
        line.end_with?("_ext.rb")
    end
    cleaner.add_filter { |line| line.delete_prefix(Rails.root.to_s) }
    cleaner
  end
