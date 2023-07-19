# typed: true
# frozen_string_literal: true

class AddUpdatedAtToLocationLogs < ActiveRecord::Migration[7.0]
  def change
    add_column :location_logs, :updated_at, :timestamptz
    LocationLog.update_all("updated_at = created_at") # rubocop:disable Rails/SkipsModelValidations, Layout/LineLength
    change_column_null :location_logs, :updated_at, false
  end
end
