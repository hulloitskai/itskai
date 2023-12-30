# typed: true
# frozen_string_literal: true

class TimelineAdminController < ApplicationController
  # == Filters
  before_action :authenticate_user!

  # == Actions
  # GET /timeline/admin
  def show
    authorize!(with: AdminPolicy)
    render(inertia: "TimelineAdminPage")
  end
end
