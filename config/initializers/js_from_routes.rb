# typed: true
# frozen_string_literal: true

return unless Rails.env.development?

ADDITIONAL_CONTROLLERS = %w[users/sessions]

JsFromRoutes.config do |config|
  config.file_suffix = "Routes.ts"
  config.output_folder = Rails.root.join("app/helpers/routes/generated")
  config.export_if = ->(route) do
    route = T.let(route, ActionDispatch::Journey::Route)
    export = T.let(route.defaults[:export], T.nilable(T::Boolean))
    controller = T.let(route.requirements[:controller], T.nilable(String))
    export ||
      controller&.in?(ADDITIONAL_CONTROLLERS) ||
      controller&.start_with?("active_storage")
  end
end
