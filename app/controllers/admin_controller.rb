# typed: true
# frozen_string_literal: true

class AdminController < ApplicationController
  # == Filters
  before_action :authenticate_user!
  before_action :authorize_user!

  # == Actions
  # GET /admin
  def show
    redirect_to(admin_settings_path)
  end

  private

  # == Filter handlers
  def authorize_user!
    authorize!(to: :administrate?, with: ApplicationPolicy)
  end
end
