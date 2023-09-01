# typed: strict
# frozen_string_literal: true

class ReverseGeocodeLocationLogsWithoutNeighbourhoodJob < ApplicationJob
  # == Configuration
  good_job_control_concurrency_with key: name, total_limit: 1

  # == Job
  sig { void }
  def perform
    LocationLog
      .includes(:address)
      .where(location_log_addresses: { neighbourhood: nil })
      .references(:address)
      .find_each do |location_log|
        tag_logger do
          logger.info(
            "Reverse geocoding address for LocationLog with id " \
              "`#{location_log.id}'",
          )
        end
        location_log.reverse_geocode_and_save!
        sleep(1)
      end
  end
end
