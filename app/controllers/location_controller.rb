# typed: true
# frozen_string_literal: true

class LocationController < ApplicationController
  # == Actions
  def show
    params = LocationShowParams.new(self.params.permit(:password))
    params.validate!
    render(inertia: "LocationPage", props: { password: params.password })
  end
end
