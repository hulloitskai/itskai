# typed: true
# frozen_string_literal: true

require "inertia_rails_ext"

InertiaRails.configure do |config|
  config.ssr_enabled = true
  config.ssr_url = "http://localhost:13714"
end
