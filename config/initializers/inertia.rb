# typed: strict
# frozen_string_literal: true

InertiaRails.configure do |config|
  config.ssr_url = scoped do
    port = ENV.fetch("PORT", 13714).to_i
    "http://localhost:#{port}"
  end
  unless Rails.env.development?
    config.ssr_enabled = true
    config.version = ViteRuby.digest
  end
  if (enabled = ENV["INERTIA_SSR"])
    config.ssr_enabled = enabled.truthy?
  end
end
