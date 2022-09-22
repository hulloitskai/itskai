# typed: strict
# frozen_string_literal: true

# Use TIMESTAMPTZ as native type for :datetime columns.
ActiveRecord::ConnectionAdapters::PostGISAdapter.datetime_type = :timestamptz

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
