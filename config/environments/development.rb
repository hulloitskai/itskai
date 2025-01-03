# typed: strict
# frozen_string_literal: true

# Add time helpers.
require "active_support/core_ext/integer/time"

# == Default URL
Rails.application.default_url_options = {
  protocol: "http",
  host: "localhost",
  port: ENV.fetch("RAILS_PORT") { 3000 }.to_i,
}

# == Configuration
Rails.application.configure do
  # == Code loading
  # In the development environment your application's code is reloaded any time
  # it changes. This slows down response time but is perfect for development
  # since you don't have to restart the web server when you make code changes.
  config.cache_classes = false

  # Do not eager load code on boot.
  config.eager_load = false

  # == Development hosts
  config.hosts << "kaibook.itskai.me"
  config.hosts << /([a-z0-9-]+\.)+nip\.io/
  config.hosts << /[a-z0-9-]+\.ngrok\.io/
  config.hosts << /[a-z0-9-]+\.ngrok-free\.app/

  # == Security
  # Show full error reports.
  config.consider_all_requests_local =
    ENV.fetch("RAILS_SHOW_EXCEPTION_REPORTS", true).truthy?

  # == Metrics
  # Respond with server timing metrics.
  config.server_timing = true

  # == Caching
  # Enable/disable caching. By default caching is disabled.
  # Run rails dev:cache to toggle caching.
  if Rails.root.join("tmp/caching-dev.txt").exist?
    config.action_controller.perform_caching = true
    config.action_controller.enable_fragment_cache_logging = true
    config.cache_store = :memory_store
    config.public_file_server.headers = {
      "Cache-Control" => "public, max-age=#{2.days.to_i}",
    }
  else
    config.action_controller.perform_caching = false
    config.cache_store = :memory_store
  end

  # == Debugging
  config.middleware.insert_before(Rack::Sendfile, ActionDispatch::DebugLocks)

  # == Active Storage
  # Store uploaded files on the local file system (see config/storage.yml for
  # options).
  config.active_storage.service = :local

  # == Action Mailer
  config.action_mailer.delivery_method = :smtp
  config.action_mailer.smtp_settings = { port: 1025 } # Mailcatcher
  config.action_mailer.perform_caching = false

  # Don't care if the mailer can't send.
  # config.action_mailer.raise_delivery_errors = false

  # == Active Support
  # Raises error for missing translations.
  config.i18n.raise_on_missing_translations = true

  # Print deprecation notices to the Rails logger.
  config.active_support.deprecation = :log

  # Raise exceptions for disallowed deprecations.
  config.active_support.disallowed_deprecation = :raise

  # Tell Active Support which deprecation messages to disallow.
  config.active_support.disallowed_deprecation_warnings = []

  # Raise an error on page load if there are pending migrations.
  config.active_record.migration_error = :page_load

  # Highlight code that triggered database queries in logs.
  config.active_record.verbose_query_logs = true

  # == Logging
  config.log_level = ENV.fetch("RAILS_LOG_LEVEL", :debug).to_sym

  # == Action View
  # Annotate rendered view with file names.
  config.action_view.annotate_rendered_view_with_filenames = true

  # == Action Cable
  # Uncomment if you wish to allow Action Cable access from any origin.
  # config.action_cable.disable_request_forgery_protection = true
end
