# typed: true
# frozen_string_literal: true

class AllowNullCoordinatesOnTimelinePhotos < ActiveRecord::Migration[7.1]
  def change
    change_column_null :timeline_photos, :coordinates, true
  end
end
