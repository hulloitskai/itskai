# typed: strict
# frozen_string_literal: true

Rails.application.configure do
  config.after_initialize do
    Honeybadger.configure do |config|
      config.api_key = Honeybadger.config[:server_api_key]

      # Record proper controller (component) and action for errors that are
      # handled by a custom exceptions app (ErrorsController).
      #
      # See: https://docs.honeybadger.io/lib/ruby/integration-guides/rails-exception-tracking/#if-you-use-code-config-exceptions_app-code-
      config.before_notify do |notice|
        notice = T.let(notice, Honeybadger::Notice)
        if notice.component == "errors"
          params = Rails.application.routes.recognize_path(notice.url)
          notice.component = params[:controller]
          notice.action = params[:action]
        end
      end
    end
  end
end
