# typed: true
# frozen_string_literal: true

class AddUniqueConstraintToDurationOnTimelineActivities < ActiveRecord::Migration[7.1] # rubocop:disable Layout/LineLength
  def change
    add_index :timeline_activities,
              %i[type duration],
              unique: true,
              name: "index_timeline_activities_uniqueness"
  end
end
