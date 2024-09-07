# typed: true
# frozen_string_literal: true

module Admin
  class LocationAccessGrantsController < AdminController
    # == Filters
    before_action :set_grant, only: :destroy

    # == Actions
    def create
      attributes = grant_params
      expires_in_seconds = T.let(
        attributes.delete(:expires_in_seconds),
        Integer,
      )
      @grant = LocationAccessGrant.new(
        expires_in: expires_in_seconds.seconds,
        **attributes,
      )
      if @grant.save
        render(json: { grant: LocationAccessGrantSerializer.one(@grant) })
      else
        render(
          json: { errors: @grant.form_errors },
          status: :unprocessable_entity,
        )
      end
    end

    def destroy
      grant = @grant or raise "Missing grant"
      grant.destroy!
      render(json: {})
    rescue => error
      with_log_tags do
        logger.error("Failed to destroy location access grant: #{error}")
      end
      Rails.error.report(error)
      Sentry.capture_exception(error)
      render(json: { error: error.message }, status: :internal_server_error)
    end

    private

    # == Helpers
    sig { returns(ActionController::Parameters) }
    def grant_params
      params.require(:grant).permit(
        :recipient,
        :password,
        :expires_in_seconds,
      )
    end

    # == Filter handlers
    sig { void }
    def set_grant
      @grant = T.let(
        LocationAccessGrant.find(params.fetch(:id)),
        T.nilable(LocationAccessGrant),
      )
    end
  end
end
