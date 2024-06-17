# typed: true
# frozen_string_literal: true

class AdminController < ApplicationController
  # == Filters
  before_action :authenticate_user!
  before_action :authorize_admin!

  # == Actions
  # GET /admin
  def show
    google_connection = OAuthConnection.google
    spotify_connection = OAuthConnection.spotify
    icloud_connection = ICloudConnection.current
    render(inertia: "AdminPage", props: {
      "googleConnection" => OAuthConnectionSerializer.one(google_connection),
      "spotifyConnection" => OAuthConnectionSerializer.one(spotify_connection),
      "icloudConnection" => ICloudConnectionSerializer.one(icloud_connection),
    })
  end

  # GET /admin/location_access_grants
  def location_access_grants
    render(json: {
      grants: LocationAccessGrantSerializer.one(LocationAccessGrant.valid),
    })
  end

  # POST /admin/sync_journal_entries
  def sync_journal_entries
    results = JournalEntry.sync
    render(json: results.serialize)
  end

  # POST /admin/sync_location_logs
  def sync_location_logs
    log = LocationLog.sync
    render(json: { location: LocationSerializer.one_if(log) })
  end

  private

  # == Filter Handlers
  def authorize_admin!
    authorize!(with: AdminPolicy)
  end
end
