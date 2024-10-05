# typed: strict
# frozen_string_literal: true

Geocoder.configure(logger: Rails.logger, always_raise: :all)

# == Here
unless ENV["NO_CREDENTIALS"]
  Geocoder.configure(
    lookup: :here,
    api_key: Rails.application.credentials.here!.api_key!,
  )
end
