# typed: true
# frozen_string_literal: true

Sentry.init do |config|
  config.dsn = ENV["SENTRY_DSN"]
  config.breadcrumbs_logger = %i[active_support_logger http_logger]
  config.excluded_exceptions += ["ActionPolicy::Unauthorized"]

  # Set traces_sample_rate to 1.0 to capture 100% of transactions for
  # performance monitoring.
  #
  # We recommend adjusting this value in production.
  config.traces_sample_rate = ENV.fetch("SENTRY_TRACES_SAMPLE_RATE", 0.0).to_f
end
