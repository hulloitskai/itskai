# typed: true
# frozen_string_literal: true

module Users
  class SessionsController < Devise::SessionsController
    # == Filters
    before_action :store_redirect_location, only: :new

    # == Actions
    # GET /login
    def new
      render(inertia: "LoginPage", props: { failed: flash.alert.present? })
    end

    # POST /login
    def create
      resource = T.let(self.resource = warden.authenticate!(auth_options), User)
      sign_in(resource_name, resource)
      redirect_url = after_sign_in_path_for(resource)
      render(json: {
        resource_name => UserSerializer.one(resource),
        "redirectUrl" => redirect_url,
      })
    end

    # DELETE /logout
    def destroy
      sign_out(resource)
      render(json: {})
    end

    private

    # == Filter handlers
    sig { void }
    def store_redirect_location
      url = params[:redirect_url].presence or return
      if url.is_a?(String)
        store_location_for(:user, url)
      else
        raise "Redirect URL must be a string"
      end
    end
  end
end
