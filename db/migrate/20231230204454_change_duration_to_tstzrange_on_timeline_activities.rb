# typed: true
# frozen_string_literal: true

class ChangeDurationToTstzrangeOnTimelineActivities < ActiveRecord::Migration[7.1] # rubocop:disable Layout/LineLength
  def up
    TimelineActivity.destroy_all
    change_table :timeline_activities do |t|
      t.remove :duration
      t.tstzrange :duration, index: { unique: true }
    end
  end
end
