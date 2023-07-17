# typed: true
# frozen_string_literal: true

class RequireCoordinatesOnLocationLogs < ActiveRecord::Migration[7.0]
  def change
    change_column_null :location_logs, :coordinates, false
  end
end
