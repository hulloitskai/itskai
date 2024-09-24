# typed: true
# frozen_string_literal: true

module Admin
  class LocationAccessGrantsController < AdminController
    # == Actions
    # POST /admin/location_access_grants
    def create
      grant_attributes = params.require(:grant).permit(
        :recipient,
        :password,
        :expires_in_seconds,
      )
      expires_in_seconds = T.let(
        grant_attributes.delete(:expires_in_seconds),
        Integer,
      )
      grant = LocationAccessGrant.new(
        expires_in: expires_in_seconds.seconds,
        **grant_attributes,
      )
      if grant.save
        render(
          json: { grant: LocationAccessGrantSerializer.one(@grant) },
          status: :created,
        )
      else
        render(
          json: { errors: @grant.form_errors },
          status: :unprocessable_entity,
        )
      end
    end

    # DELETE /admin/location_access_grants/:id
    def destroy
      grant = LocationAccessGrant.find(params[:id])
      grant.destroy!
      render(json: {})
    rescue => error
      with_log_tags do
        logger.error("Failed to destroy location access grant: #{error}")
      end
      raise
    end
  end
end
