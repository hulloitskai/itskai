# typed: strict
# frozen_string_literal: true

class Users::SessionsController < Devise::SessionsController
  # == Actions ==
  # GET /account/sign_in
  sig { override.void }
  def new
    data = query!("AccountSignInPageQuery")
    render(inertia: "AccountSignInPage", props: { data: data })
  end

  # POST /account/sign_in
  sig { override.void }
  def create
    self.resource = warden.authenticate!(auth_options)
    set_flash_message!(:notice, :signed_in)
    sign_in(resource_name, resource)
    respond_with(resource, location: after_sign_in_path_for(resource))
  end
end
