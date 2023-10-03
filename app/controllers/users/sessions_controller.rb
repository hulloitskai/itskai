# typed: true
# frozen_string_literal: true

module Users
  class SessionsController < Devise::SessionsController
    # == Actions
    # GET /<resource>/login
    def new
      if (url = params[:redirect_url].presence) && url.is_a?(String)
        store_location_for(:user, url)
      end
      render(
        inertia: "UserLoginPage",
        props: {
          failed: flash.alert.present?,
        },
      )
    end

    # POST /<resource>/login
    def create
      self.resource = warden.authenticate!(auth_options)
      sign_in(resource_name, resource)
      set_flash_message!(:notice, :signed_in)
      redirect_to(after_sign_in_path_for(resource))
    end

    protected

    # == Helpers
    sig { override.returns(T.nilable(User)) }
    def resource = super
  end
end
