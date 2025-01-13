# typed: strict
# frozen_string_literal: true

return unless defined?(Rack::MiniProfiler)

Rack::MiniProfiler.config.then do |config|
  config.position = "bottom-left"
  config.enable_advanced_debugging_tools = true
  config.skip_paths = [%r{\A/#{ViteRuby.config.public_dir}}]
end
