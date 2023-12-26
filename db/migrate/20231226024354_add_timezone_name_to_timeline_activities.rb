# typed: true
# frozen_string_literal: true

class AddTimezoneNameToTimelineActivities < ActiveRecord::Migration[7.1]
  def change
    TimelineActivity.destroy_all
    add_column :timeline_activities, :timezone_name, :string, null: false
  end
end
