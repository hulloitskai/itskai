# typed: true
# frozen_string_literal: true

class LocationController < ApplicationController
  # == Actions
  def show
    render(inertia: "LocationPage")
  end
end
