# typed: true
# frozen_string_literal: true

Sentry.init do |config|
  unless ENV["NO_CREDENTIALS"].truthy?
    config.dsn = Rails.application.credentials.sentry!.dsn
  end
  config.breadcrumbs_logger = %i[
    sentry_logger
    active_support_logger
    http_logger
  ]
  config.send_default_pii = true
  config.excluded_exceptions += %w[
    ActiveSupport::MessageVerifier::InvalidSignature
    ActionPolicy::Unauthorized
    Notion::Api::Errors::TimeoutError
    Notion::Api::Errors::UnavailableError
  ]

  # Set traces_sample_rate to 1.0 to capture 100% of transactions for
  # performance monitoring.
  #
  # We recommend adjusting this value in production.
  config.traces_sample_rate = 0.05
  config.profiles_sample_rate = 0.05

  # Ignore healthcheck route.
  config.before_send_transaction = proc do |event|
    if event.transaction == "Healthcheck::HealthchecksController#check"
      nil
    else
      event
    end
  end
end
