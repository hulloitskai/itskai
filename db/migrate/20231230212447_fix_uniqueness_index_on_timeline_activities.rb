# typed: true
# frozen_string_literal: true

class FixUniquenessIndexOnTimelineActivities < ActiveRecord::Migration[7.1]
  def change
    change_table :timeline_activities do |t|
      t.remove_index :duration
      t.index %i[type duration],
        name: "index_timeline_activities_uniqueness",
        unique: true
    end
  end
end
