# typed: strict
# frozen_string_literal: true

Rails.application.configure do
  config.before_configuration do
    config.action_mailer.tap do |config|
      if config.delivery_method == :mailcatcher
        config.delivery_method = :smtp
        config.smtp_settings = { port: 1025 }
      end
    end
  end
end
