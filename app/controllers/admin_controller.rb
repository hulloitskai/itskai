# typed: true
# frozen_string_literal: true

class AdminController < ApplicationController
  # == Filters
  before_action :authenticate_user!

  # == Actions
  def show
    authorize!(with: AdminPolicy)
    render(inertia: "AdminPage")
  end
end
