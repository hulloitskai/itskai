# typed: true
# frozen_string_literal: true

class RenameGoogleTimelineActivitiesToTimelineActivities < ActiveRecord::Migration[7.1] # rubocop:disable Layout/LineLength
  def change
    rename_table :google_timeline_activities, :timeline_activities
  end
end
