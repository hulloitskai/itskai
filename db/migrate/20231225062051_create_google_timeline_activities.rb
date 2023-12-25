# typed: true
# frozen_string_literal: true

class CreateGoogleTimelineActivities < ActiveRecord::Migration[7.1]
  def change
    create_table :google_timeline_activities, id: :uuid do |t|
      t.string :type, null: false
      t.geometry :location, null: false, geographic: true, srid: 4326
      t.tsrange :duration, null: false
      t.string :name
      t.string :address
      t.integer :confidence, null: false, limit: 1

      t.timestamps
    end
  end
end
