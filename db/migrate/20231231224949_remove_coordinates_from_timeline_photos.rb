# typed: true
# frozen_string_literal: true

class RemoveCoordinatesFromTimelinePhotos < ActiveRecord::Migration[7.1]
  def change
    remove_column :timeline_photos, :coordinates, :string
  end
end
