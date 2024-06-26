# typed: true
# frozen_string_literal: true

class TimelineController < ApplicationController
  # == Actions
  # GET /timeline
  def show
    render(inertia: "TimelinePage")
  end
end
