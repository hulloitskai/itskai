# typed: true
# frozen_string_literal: true

if (credentials = Rails.application.credentials.sentry)
  Sentry.init do |config|
    config.dsn = credentials.dsn!
    config.breadcrumbs_logger = %i[
      sentry_logger
      active_support_logger
      http_logger
    ]
    config.send_default_pii = true
    config.enabled_environments = %w[production]
    config.excluded_exceptions += %w[
      ActiveSupport::MessageVerifier::InvalidSignature
      ActionPolicy::Unauthorized
      Notion::Api::Errors::TimeoutError
      Notion::Api::Errors::UnavailableError
      UnauthenticatedError
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
end
