# typed: strict
# frozen_string_literal: true

Mailjet.configure do |config|
  config.api_version = "v3.1"
  if Rails.application.credentials_available? && Rails.env.production?
    credentials = Rails.application.credentials.mailjet!
    config.api_key = credentials.api_key!
    config.secret_key = credentials.secret_key!
  end
end
