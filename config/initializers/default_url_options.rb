# typed: strict
# frozen_string_literal: true

if (url = ENV["RAILS_DEFAULT_URL"])
  Rails.application.configure do
    config.before_configuration do
      uri = Addressable::URI.parse(url)
      routes.default_url_options = {
        protocol: uri.scheme,
        host: uri.hostname,
        port: uri.port,
      }
    end
  end
end
