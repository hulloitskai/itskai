# typed: strict
# frozen_string_literal: true

Rails.application.configure do
  config.after_initialize do
    url_options = Rails.application.routes.default_url_options.dup
    url_options[:scheme] = url_options.delete(:protocol) || "http"
    url = Addressable::URI.new(url_options)
    Premailer::Rails.config.merge!(base_url: url.to_s, css_to_attributes: false)
  end
end
