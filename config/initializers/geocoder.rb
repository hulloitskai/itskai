# typed: strict
# frozen_string_literal: true

Geocoder.configure(logger: Rails.logger, always_raise: :all)

# == Here
Geocoder.configure(lookup: :here, api_key: ENV["HERE_API_KEY"])
