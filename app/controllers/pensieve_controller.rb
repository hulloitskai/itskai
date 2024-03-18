# typed: true
# frozen_string_literal: true

class PensieveController < ApplicationController
  # == Filters
  before_action :authenticate_user!

  # == Actions
  def show
    render(inertia: "PensievePage")
  end
end
