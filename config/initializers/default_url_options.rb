# typed: strict
# frozen_string_literal: true

Rails.application.configure do
  config.before_configuration do
    default_url = ENV["RAILS_DEFAULT_URL"]
    if default_url.present?
      url = Addressable::URI.parse(default_url)
      routes.default_url_options = {
        protocol: url.scheme,
        host: url.hostname,
        port: url.port,
      }
    elsif Rails.env.development?
      routes.default_url_options = {
        protocol: "http",
        host: "localhost",
        port: 3000,
      }
    end

    config.action_mailer.default_url_options = routes.default_url_options
  end
end
