# typed: strict
# frozen_string_literal: true

url_options = Rails.application.routes.default_url_options.dup
url_options[:scheme] = url_options.delete(:protocol) || "http"
if url_options[:host].present?
  url = Addressable::URI.new(url_options)
  Premailer::Rails.config[:base_url] = url.to_s
end
