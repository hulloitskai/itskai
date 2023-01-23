# typed: strict
# frozen_string_literal: true

Rails.application.configure do
  config.before_configuration do
    routes.default_url_options = scoped do
      default_url = ENV["RAILS_DEFAULT_URL"]
      if default_url.present?
        url = Addressable::URI.parse(default_url)
        {
          protocol: url.scheme,
          host: url.hostname,
          port: url.port,
        }
      else
        {
          protocol: "http",
          host: "localhost",
          port: 3000,
        }
      end
    end
  end
end
