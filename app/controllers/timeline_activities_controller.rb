# typed: true
# frozen_string_literal: true

class TimelineActivitiesController < ApplicationController
  # == Actions
  def index
    params = activities_parameters
    @activities = authorized_scope(TimelineActivity.all)
    @activities = @activities
      .where("duration && tstzrange(?, ?)", params.after, params.before)
      .order(:duration)
    render(json: {
      activities: TimelineActivitySerializer.many(@activities),
    })
  end

  private

  # == Helpers
  sig { returns(TimelineActivitiesParameters) }
  def activities_parameters
    @activities_parameters ||= scoped do
      params = TimelineActivitiesParameters.new(self.params)
      params.validate!
      params
    end
  end
end
