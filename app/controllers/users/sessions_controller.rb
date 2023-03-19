# typed: true
# frozen_string_literal: true

module Users
  class SessionsController < Devise::SessionsController
    # == Actions
    # GET /<resource>/login
    def new
      params[:redirect_url].presence.try! do |url|
        store_location_for(:user, url)
      end
      render(inertia: "UserLoginPage")
    end

    # POST /<resource>/login
    def create
      self.resource = warden.authenticate!(auth_options)
      set_flash_message!(:notice, :signed_in)
      sign_in(resource_name, resource)
      inertia_location(after_sign_in_path_for(resource))
    end

    protected

    # == Helpers
    sig { override.returns(User) }
    def resource
      super
    end

    sig { override.params(new_resource: User).returns(User) }
    def resource=(new_resource)
      super
    end
  end
end
