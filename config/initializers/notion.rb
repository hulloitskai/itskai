# typed: strict
# frozen_string_literal: true

Notion.configure do |config|
  unless ENV["NO_CREDENTIALS"].truthy?
    config.token = Rails.application.credentials.notion!.api_token!
  end
end
