# typed: ignore
# frozen_string_literal: true

class ReverseGeocodeLocationLogsWithoutNeighbourhood < ActiveRecord::Migration[7.0] # rubocop:disable Layout/LineLength
  disable_ddl_transaction!

  def change
    ReverseGeocodeLocationLogsWithoutNeighbourhoodJob
      .set(wait: 1.minute)
      .perform_later
  end
end
