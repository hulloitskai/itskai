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
      errors = flash.alert.try! do |alert|
        { "alert" => alert }
      end
      render(
        inertia: "UserLoginPage",
        props: {
          errors:,
        },
      )
    end

    # POST /<resource>/login
    def create
      self.resource = warden.authenticate!(auth_options)
      set_flash_message!(:notice, :signed_in)
      sign_in(resource_name, resource)
      inertia_location(after_sign_in_path_for(resource))
    end

    private

    # == Helpers
    def respond_to_on_destroy
      respond_to do |format|
        format.all { head(:no_content) }
        format.any(*navigational_formats) do
          inertia_location(after_sign_out_path_for(resource_name))
        end
      end
    end
  end
end

# == Sorbet
module Users
  class SessionsController
    protected

    # == Annotations
    sig { override.returns(T.nilable(User)) }
    def resource = super
  end
end
