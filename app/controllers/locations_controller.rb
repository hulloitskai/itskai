# typed: true
# frozen_string_literal: true

class LocationsController < ApplicationController
  # == Filters
  before_action :authenticate_user!, only: :grant

  # == Actions
  # GET /locate
  def show
    location = LocationLog.latest_visible
    access_token = location_params.access_token
    if access_token
      access_grant = LocationAccessGrant
        .joins(:accesses)
        .find_by(accesses: { token: access_token })
      raise "Invalid access token" unless access_grant
      render(inertia: "LocatePage", props: {
        location: LocationWithTrailSerializer.one_if(location),
        "accessToken" => access_token,
        "accessGrant" => LocationAccessGrantSerializer.one_if(access_grant),
      })
    else
      render(inertia: "LocatePage", props: {
        "approximateLocation" => ApproximateLocationSerializer.one_if(location),
      })
    end
  rescue => error
    with_log_tags do
      logger.error("Failed to show location: #{error}")
    end
    redirect_to(
      location_path,
      alert: "Failed to access location: #{error}",
    )
  end

  # POST /locate/access
  def access
    access_request = LocationAccessRequest.new(access_request_params)
    unless access_request.valid?
      render(
        json: { errors: access_request.form_errors },
        status: :unprocessable_entity,
      )
    end
    grant = LocationAccessGrant.valid.find_by(access_request.to_h)
    if Rails.env.development? &&
        !grant &&
        access_request.password! == "developer"
      grant = LocationAccessGrant.create!(
        recipient: "developer",
        expires_at: 3.hours.from_now,
        **access_request.to_h,
      )
    end
    if grant
      access = grant.accesses.create!
      render(json: { token: access.token })
    else
      render(
        json: { errors: { password: "Password is invalid or expired" } },
        status: :unprocessable_entity,
      )
    end
  end

  # GET /locate/grant
  def grant
    authorize!(with: LocatePolicy)
    recipient = l(Time.current, format: :short)
    expires_at = 3.hours.from_now
    LocationAccessGrant.create!(recipient:, expires_at:)
    redirect_to(
      admin_path(anchor: "location-access-grants"),
      notice: "Location access granted until #{l(expires_at, format: :short)}",
    )
  end

  private

  # == Filter Handlers
  sig { returns(LocationParams) }
  def location_params
    @location_params = LocationParams
      .new(params.permit(*LocationParams.attribute_names))
      .tap(&:validate!)
  end

  sig { returns(ActionController::Parameters) }
  def access_request_params
    params.require(:access_request).permit(:password)
  end
end
