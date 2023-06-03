# typed: strict
# frozen_string_literal: true

require "active_support/core_ext/integer/time"

Rails.application.configure do
  # == Code Loading
  # Code is not reloaded between requests.
  config.cache_classes = true

  # Eager load code on boot. This eager loads most of Rails and
  # your application in memory, allowing both threaded web servers
  # and those relying on copy on write to perform better.
  # Rake tasks automatically ignore this option for performance.
  config.eager_load = true

  # Full error reports are disabled and caching is turned on.
  config.consider_all_requests_local = false
  config.action_controller.perform_caching = true

  # Ensures that a master key has been made available in either
  # ENV["RAILS_MASTER_KEY"] or in config/master.key. This key is used to decrypt
  # credentials (and other encrypted files).
  # config.require_master_key = true

  # Force all access to the app over SSL, use Strict-Transport-Security, and use
  # secure cookies.
  # config.force_ssl = true

  # Use a different cache store in production.
  # config.cache_store = :mem_cache_store

  # == Action Dispatch
  # Disable serving static files from the `/public` folder by default since
  # Apache or NGINX already handles this.
  config.public_file_server.enabled = !ENV["RAILS_SERVE_STATIC_FILES"].falsy?

  # Enable serving of images, stylesheets, and JavaScripts from an asset server.
  # config.asset_host = "http://assets.example.com"

  # Specifies the header that your server uses for sending files.
  # config.action_dispatch.x_sendfile_header = "X-Sendfile" # for Apache
  # config.action_dispatch.x_sendfile_header = "X-Accel-Redirect" # for NGINX

  # == Active Storage
  # Store uploaded files on the local file system (see config/storage.yml for
  # options).
  config.active_storage.service =
    ENV.fetch("RAILS_STORAGE_SERVICE", :amazon).to_sym

  # == Action Cable
  # Mount Action Cable outside main process or domain.
  # config.action_cable.mount_path = nil
  # config.action_cable.url = "wss://example.com/cable"
  # config.action_cable.allowed_request_origins =
  #   [ "http://example.com", /http:\/\/example.*/ ]

  # Use a real queuing backend for Active Job (and separate queues per
  # environment).
  # config.active_job.queue_adapter     = :resque
  # config.active_job.queue_name_prefix = "itskai_production"

  # == Active Record
  # Do not dump schema after migrations.
  config.active_record.dump_schema_after_migration = false

  # == Action Mailer
  config.action_mailer.delivery_method =
    ENV.fetch("RAILS_MAILER", :mailjet).to_sym
  config.action_mailer.perform_caching = false

  # Ignore bad email addresses and do not raise email delivery errors.
  # Set this to true and configure the email server for immediate delivery to
  # raise delivery errors.
  # config.action_mailer.raise_delivery_errors = false

  # == Action Mailbox
  # config.action_mailbox.ingress = ENV.fetch("RAILS_MAILBOX", :mailgun).to_sym

  # == Active Support
  # Enable locale fallbacks for I18n (makes lookups for any locale fall back to
  # the I18n.default_locale when a translation cannot be found).
  config.i18n.fallbacks = true

  # Don't log any deprecations.
  config.active_support.report_deprecations = false

  # == Logging
  # Include generic and useful information about system operation, but avoid
  # logging too much information to avoid inadvertent exposure of personally
  # identifiable information (PII).
  config.log_level = ENV.fetch("RAILS_LOG_LEVEL", :info).to_sym

  # Prepend all log lines with the following tags.
  config.log_tags = [:request_id]

  # Use default logging formatter so that PID and timestamp are not suppressed.
  config.log_formatter = Logger::Formatter.new

  # Use a different logger for distributed setups.
  #   require "syslog/logger"
  #   config.logger =
  #     ActiveSupport::TaggedLogging.new(Syslog::Logger.new "app-name")

  # == Action Mailbox
  # Prepare the ingress controller used to receive mail
  # config.action_mailbox.ingress = :relay

  # == Good Job
  config.good_job.execution_mode =
    ENV.fetch("GOOD_JOB_EXECUTION_MODE", :async).to_sym
end
