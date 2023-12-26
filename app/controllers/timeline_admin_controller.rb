# typed: true
# frozen_string_literal: true

class TimelineAdminController < ApplicationController
  # == Filters
  before_action :authenticate_user!

  # == Actions
  # GET /timeline/admin
  def show
    authorize!(with: AdminPolicy)
    render(inertia: "TimelineAdminPage", props: {
      google_location_history_upload_url:
        timeline_admin_google_location_history_url,
      photos_upload_url: timeline_admin_photos_url,
    })
  end

  # POST /timeline/admin/google_location_history
  def google_location_history
    authorize!(with: AdminPolicy)
    file = google_location_history_params.fetch(:file)
    activities = TimelineActivity
      .import_from_google_location_history_upload!(file)
    redirect_to(
      timeline_admin_path,
      notice: "Imported #{activities.size} timeline activities.",
    )
  rescue => error
    raise if Rails.env.development?
    redirect_to(timeline_admin_path, alert: error.message)
  end

  # POST /timeline/admin/photos
  def photos
    authorize!(with: AdminPolicy)
    files = photos_params.fetch(:files)
    photos = TimelinePhoto.import_from_bulk_upload!(files)
    redirect_to(
      timeline_admin_path,
      notice: "Imported #{photos.size} photos.",
    )
  rescue => error
    raise if Rails.env.development?
    redirect_to(timeline_admin_path, alert: error.message)
  end

  private

  # == Helpers
  sig { returns(ActionController::Parameters) }
  def google_location_history_params
    params.require(:google_location_history).permit(:file)
  end

  sig { returns(ActionController::Parameters) }
  def photos_params
    params.require(:photos).permit(files: [])
  end
end
