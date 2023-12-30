# typed: true
# frozen_string_literal: true

class IndexTimelinePhotosOnTimestamp < ActiveRecord::Migration[7.1]
  def change
    add_index :timeline_photos, :timestamp
  end
end
