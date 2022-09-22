# typed: strict
# frozen_string_literal: true

Rails.application.configure do
  config.after_initialize do
    Honeybadger.configure do |config|
      config.api_key = Honeybadger.config[:server_api_key]
    end
  end
end
