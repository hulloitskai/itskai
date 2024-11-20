# typed: true
# frozen_string_literal: true

module Admin
  class SettingsController < AdminController
    # == Actions
    # GET /admin/settings
    def show
      admin_params = AdminParameters.new(params)
      admin_params.validate!
      google_connection = OAuthConnection.google
      spotify_connection = OAuthConnection.spotify
      icloud_connection = ICloudConnection.current
      num_logs_without_addresses = LocationLog.where.missing(:address).count
      render(inertia: "AdminSettingsPage", props: {
        "googleConnection" => OAuthConnectionSerializer.one(google_connection),
        "spotifyConnection" =>
          OAuthConnectionSerializer.one(spotify_connection),
        "icloudConnection" => ICloudConnectionSerializer.one(icloud_connection),
        "numLogsWithoutAddresses" => num_logs_without_addresses,
        "newLocationAccessGrantId" => admin_params.new_location_access_grant_id,
      })
    end
  end
end
