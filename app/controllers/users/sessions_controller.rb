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
      render(inertia: "UserLoginPage", props: { failed: flash.alert.present? })
    end

    # POST /<resource>/login
    def create
      self.resource = warden.authenticate!(auth_options)
      sign_in(resource_name, resource)
      set_flash_message!(:notice, :signed_in)
      inertia_location(after_sign_in_path_for(resource))
    end

    protected

    # == Helpers
    sig { void }
    def respond_to_on_destroy
      # We actually need to hardcode this as Rails default responder doesn't
      # support returning empty response on GET request.
      respond_to do |format|
        format.all { head(:no_content) }
        format.any(*navigational_formats) do
          inertia_location(after_sign_out_path_for(resource_name))
        end
      end
    end
  end
end
