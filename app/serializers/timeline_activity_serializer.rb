# typed: true
# frozen_string_literal: true

class TimelineActivitySerializer < ApplicationSerializer
  # == Configuration
  object_as :activity, model: "TimelineActivity"

  # == Attributes
  identifier
  attributes :duration, :type
end
