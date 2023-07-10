# typed: strict
# frozen_string_literal: true

ENV["RAILS_DEFAULT_URL"].try! do |default_url|
  Rails.application.configure do
    config.before_configuration do
      url = Addressable::URI.parse(default_url)
      routes.default_url_options = {
        protocol: url.scheme,
        host: url.hostname,
        port: url.port,
      }
    end
  end
end
