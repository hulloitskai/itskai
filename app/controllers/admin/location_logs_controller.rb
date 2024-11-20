# typed: true
# frozen_string_literal: true

module Admin
  class LocationLogsController < AdminController
    # == Actions
    # POST /admin/location_logs/sync
    def sync
      latest_log = LocationLog.sync
      render(json: {
        "lastSyncedTimestamp" => latest_log&.timestamp&.iso8601,
      })
    end

    # POST /admin/location_logs/backfill_addresses
    def backfill_addresses
      backfill_params = AdminLocationLogBackfillAddressesParameters.new(params)
      backfill_params.validate!
      num_logs_backfilling = LocationLog.backfill_addresses_later(
        **backfill_params.to_h.compact.symbolize_keys,
      )
      render(json: {
        "numLogsBackfilling" => num_logs_backfilling,
      })
    end
  end
end
