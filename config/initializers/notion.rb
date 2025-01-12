# typed: strict
# frozen_string_literal: true

Notion.configure do |config|
  if Rails.application.credentials_available?
    config.token = Rails.application.credentials.notion!.api_token!
  end
end
