# typed: strict
# frozen_string_literal: true

InertiaRails.configure do |config|
  config.encrypt_history = Rails.env.production?
  config.ssr_url = scoped do
    port = ENV.fetch("INERTIA_PORT", 13714).to_i
    "http://localhost:#{port}"
  end
  unless Rails.env.development?
    config.ssr_enabled = ViteRuby.config.ssr_build_enabled
    config.version = ViteRuby.digest
  end
end
