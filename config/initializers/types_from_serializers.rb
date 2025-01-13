# typed: true
# frozen_string_literal: true

return unless Rails.env.development?

TypesFromSerializers.config do |config|
  config.base_serializers = %w[ApplicationSerializer]
  config.output_dir = Rails.root.join("app/types/generated")
  config.sql_to_typescript_type_mapping.update(
    uuid: :string,
    date: :string,
    datetime: :string,
  )
  config.transform_keys = ->(key) { key }
  config.skip_serializer_if = ->(serializer) {
    serializer.name == "HealthcheckSerializer"
  }
end
