# typed: true
# frozen_string_literal: true

class PensieveController < ApplicationController
  # == Actions
  # GET /pensieve
  def show
    render(inertia: "PensievePage")
  end
end
