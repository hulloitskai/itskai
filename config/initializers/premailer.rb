# typed: true
# frozen_string_literal: true

Premailer::Rails.config[:css_to_attributes] = false

Rails.application.configure do
  config.before_initialize do
    url_options = Rails.application.routes.default_url_options.dup
    url_options[:scheme] = url_options.delete(:protocol) || "http"
    if url_options[:host].present?
      url = Addressable::URI.new(url_options)
      Premailer::Rails.config[:base_url] = url.to_s
    end
  end
end
