# typed: strict
# frozen_string_literal: true

Rack::MiniProfiler.config.then do |config|
  config.position = "bottom-left"
  config.enable_advanced_debugging_tools = true
end
