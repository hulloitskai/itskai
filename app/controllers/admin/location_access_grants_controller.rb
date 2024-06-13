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
      grant = LocationAccessGrant.new(
        expires_in: expires_in_seconds.seconds,
        **attributes,
      )
      if grant.save
        render(json: { grant: LocationAccessGrantSerializer.render(grant) })
      else
        render(
          json: { errors: grant.form_errors },
          status: :unprocessable_entity,
        )
      end
    end

    def destroy
      grant = T.must(@grant)
      grant.destroy!
      render(json: {})
    rescue => error
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

    # == Filter Handlers
    sig { void }
    def set_grant
      @grant = T.let(
        LocationAccessGrant.find(params.fetch(:id)),
        T.nilable(LocationAccessGrant),
      )
    end
  end
end
