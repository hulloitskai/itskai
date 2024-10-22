# typed: true
# frozen_string_literal: true

class AdminController < ApplicationController
  # == Filters
  before_action :authenticate_user!
  before_action :authorize_user!

  # == Actions
  # GET /admin
  def show
    admin_params = AdminParameters.new(params)
    admin_params.validate!
    google_connection = OAuthConnection.google
    spotify_connection = OAuthConnection.spotify
    icloud_connection = ICloudConnection.current
    num_logs_without_addresses = LocationLog.where.missing(:address).count
    render(inertia: "AdminPage", props: {
      "googleConnection" => OAuthConnectionSerializer.one(google_connection),
      "spotifyConnection" => OAuthConnectionSerializer.one(spotify_connection),
      "icloudConnection" => ICloudConnectionSerializer.one(icloud_connection),
      "numLogsWithoutAddresses" => num_logs_without_addresses,
      "newLocationAccessGrantId" => admin_params.new_location_access_grant_id,
    })
  end

  # GET /admin/location_access_grants
  def location_access_grants
    grants = LocationAccessGrant.valid
    render(json: {
      grants: LocationAccessGrantSerializer.many(grants),
    })
  end

  # POST /admin/sync_notion_journal_entries
  def sync_notion_journal_entries
    sync_results = NotionJournalEntry.sync
    render(json: {
      "syncResults" => NotionJournalEntrySyncResultsSerializer
      .one(sync_results),
    })
  end

  # POST /admin/sync_location_logs
  def sync_location_logs
    log = LocationLog.sync
    render(json: {
      "lastSyncedTimestamp" => log&.timestamp&.iso8601,
    })
  end

  # POST /admin/backfill_location_log_addresses
  def backfill_location_log_addresses
    backfill_params = AdminBackfillLocationLogAddressesParameters.new(params)
    backfill_params.validate!
    num_logs_backfilling = LocationLog.backfill_addresses_later(
      **backfill_params.to_h.compact.symbolize_keys,
    )
    render(json: { "numLogsBackfilling" => num_logs_backfilling })
  end

  private

  # == Filter handlers
  def authorize_user!
    authorize!(to: :administrate?, with: ApplicationPolicy)
  end
end
