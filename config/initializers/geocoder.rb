# typed: strict
# frozen_string_literal: true

Geocoder.configure(
  cache: Geocoder::CacheStore::Generic.new(Rails.cache, {}),
  logger: Rails.logger,
  always_raise: :all,
)

# == Here Maps
if Rails.application.credentials_available?
  Geocoder.configure(
    lookup: :here,
    api_key: Rails.application.credentials.here!.api_key!,
  )
end
