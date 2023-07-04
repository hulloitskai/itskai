# typed: true
# frozen_string_literal: true

InertiaRails.configure do |config|
  config.ssr_url = "http://localhost:13714"
  unless Rails.env.development?
    config.ssr_enabled = true
    config.version = ViteRuby.digest
  end
  ENV["INERTIA_SSR"].try! do |enabled|
    config.ssr_enabled = enabled.truthy?
  end
end
