# typed: strict
# frozen_string_literal: true

Mailjet.configure do |config|
  config.api_version = "v3.1"
  config.api_key = ENV["MAILJET_API_KEY"]
  config.secret_key = ENV["MAILJET_SECRET_KEY"]
end
