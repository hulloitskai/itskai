# typed: true
# frozen_string_literal: true

class RenameLocationToCoordinatesOnTimelinePhotos < ActiveRecord::Migration[7.1]
  def change
    rename_column :timeline_photos, :location, :coordinates
  end
end
