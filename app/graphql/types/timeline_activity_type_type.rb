# typed: strict
# frozen_string_literal: true

module Types
  class TimelineActivityTypeType < BaseEnum
    # == Values
    value "ACTIVITY_SEGMENT", value: :activity_segment
    value "PLACE_VISIT", value: :place_visit
  end
end
