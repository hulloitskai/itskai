# typed: true
# frozen_string_literal: true

class AddConfidenceConstraintToTimelineActivities < ActiveRecord::Migration[7.1]
  def change
    add_check_constraint :timeline_activities,
      "confidence BETWEEN 0 AND 3",
      name: "check_confidence"
  end
end
