# typed: true
# frozen_string_literal: true

class TimelineController < ApplicationController
  # == Actions
  def show
    render(inertia: "TimelinePage")
  end
end
