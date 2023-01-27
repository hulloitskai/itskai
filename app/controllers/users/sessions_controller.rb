# typed: true
# frozen_string_literal: true

module Users
  class SessionsController < Devise::SessionsController
    # == Actions
    # GET /<resource>/login
    def new
      render(inertia: "UserLoginPage")
    end

    # POST /<resource>/login
    def create
      self.resource = warden.authenticate!(auth_options)
      set_flash_message!(:notice, :signed_in)
      sign_in(resource_name, resource)
      respond_with(resource, location: after_sign_in_path_for(resource))
    end
  end
end
