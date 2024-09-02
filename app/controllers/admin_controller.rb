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
      "newLocationAccessGrantId" => admin_params.new_location_access_grant_id,
    })
  end

  # GET /admin/location_access_grants
  def location_access_grants
    render(json: {
      grants: LocationAccessGrantSerializer.many(LocationAccessGrant.valid),
    })
  end

  # POST /admin/sync_notion_journal_entries
  def sync_notion_journal_entries
    results = NotionJournalEntry.sync
    render(json: results.serialize)
  end

  # POST /admin/sync_location_logs
  def sync_location_logs
    log = LocationLog.sync
    render(json: { location: LocationSerializer.one_if(log) })
  end

  # POST /admin/backfill_location_log_addresses
  def backfill_location_log_addresses
    backfilled_logs = LocationLog.backfill_addresses_later
    render(json: { "logsQueued" => backfilled_logs.size })
  end

  private

  # == Helpers
  sig { returns(AdminParameters) }
  def admin_params
    @admin_params ||= AdminParameters.new(params)
  end

  # == Filter handlers
  def authorize_admin!
    authorize!(with: AdminPolicy)
  end
end
