# typed: true
# frozen_string_literal: true

class LocationsController < ApplicationController
  # == Filters
  before_action :authenticate_user!, only: :grant

  # == Actions
  # GET /locate
  def show
    location = LocationLog.latest_visible
    location_params = LocationParameters.new(params)
    location_params.validate!
    access_token = location_params.access_token
    if access_token
      access_grant = LocationAccessGrant.valid
        .joins(:accesses).find_by(accesses: { token: access_token }) or
        raise "Invalid access token"
      render(inertia: "LocatePage", props: {
        location: LocationWithTrailSerializer.one_if(location),
        "accessToken" => access_token,
        "accessGrant" => LocationAccessGrantSerializer.one_if(access_grant),
      })
    else
      render(inertia: "LocatePage", props: {
        "approximateLocation" => ApproximateLocationSerializer.one_if(location),
        password: location_params.password,
      })
    end
  rescue => error
    with_log_tags do
      logger.error("Failed to show location: #{error}")
    end
    report_exception(error)
    redirect_to(
      location_path,
      alert: "Failed to access location: #{error}",
    )
  end

  # POST /locate/access
  def access
    access_request_params = params.expect(access_request: [:password])
    access_request = LocationAccessRequest.new(access_request_params)
    unless access_request.valid?
      render(
        json: { errors: access_request.form_errors },
        status: :unprocessable_entity,
      )
    end
    grant = LocationAccessGrant.valid.find_by(**access_request.to_h)
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
    authorize!(to: :create?, with: LocationAccessGrantPolicy)
    recipient = l(Time.current, format: :short)
    expires_at = 3.hours.from_now
    grant = LocationAccessGrant.create!(recipient:, expires_at:)
    redirect_to(
      admin_path(
        anchor: "location-access-grants",
        new_location_access_grant_id: grant.id,
      ),
    )
  end
end
