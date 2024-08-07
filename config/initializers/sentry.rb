# typed: true
# frozen_string_literal: true

Sentry.init do |config|
  config.dsn = ENV["SENTRY_DSN"].presence
  config.breadcrumbs_logger = %i[
    sentry_logger
    active_support_logger
    http_logger
  ]
  config.send_default_pii = true
  config.excluded_exceptions += %w[ActionPolicy::Unauthorized]

  # Set traces_sample_rate to 1.0 to capture 100% of transactions for
  # performance monitoring.
  #
  # We recommend adjusting this value in production.
  config.traces_sample_rate = ENV.fetch("SENTRY_TRACES_SAMPLE_RATE", 0.0).to_f
  config.profiles_sample_rate = ENV
    .fetch("SENTRY_PROFILES_SAMPLE_RATE", 0.0)
    .to_f

  # Ignore healthcheck route.
  config.before_send_transaction = proc do |event|
    if event.transaction == "Healthcheck::HealthchecksController#check"
      nil
    else
      event
    end
  end
end
