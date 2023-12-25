# typed: true
# frozen_string_literal: true

class CreateTimelinePhotos < ActiveRecord::Migration[7.1]
  def change
    create_table :timeline_photos, id: :uuid do |t|
      t.timestamptz :timestamp, null: false
      t.st_point :location, geographic: true, srid: 4326, null: false

      t.timestamps
    end
  end
end
