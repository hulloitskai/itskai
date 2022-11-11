# typed: strict
# frozen_string_literal: true

if defined?(JsFromRoutes)
  JsFromRoutes.config do |config|
    config.client_library = "@js-from-routes/inertia"
    config.file_suffix = "Routes.ts"
    config.all_helpers_file = false
    config.helper_mappings = {}
    config.output_folder = Rails.root.join("app/routes")
  end
end
