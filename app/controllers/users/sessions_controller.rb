# typed: strict
# frozen_string_literal: true

class Users::SessionsController < Devise::SessionsController
  # == Actions
  # GET /account/sign_in
  sig { override.void }
  def new
    data = query!("AccountSignInPageQuery")
    render(inertia: "AccountSignInPage", props: { data: })
  end

  # POST /account/sign_in
  sig { override.void }
  def create
    self.resource = warden.authenticate!(auth_options)
    set_flash_message!(:notice, :signed_in)
    sign_in(resource_name, resource)
    respond_with(resource, location: after_sign_in_path_for(resource))
  end

  # DELETE /account/sign_out
  sig { override.void }
  def destroy
    @stored_location_before_sign_out = T.let(
      @stored_location_before_sign_out,
      T.nilable(String),
    )
    @stored_location_before_sign_out = stored_location_for(resource_name)
    super
  end

  protected

  sig { params(resource_or_scope: T.untyped).returns(String) }
  def after_sign_in_path_for(resource_or_scope)
    stored_location_for(resource_or_scope) || super
  end

  sig { params(resource_or_scope: T.untyped).returns(String) }
  def after_sign_out_path_for(resource_or_scope)
    @stored_location_before_sign_out || super
  end
end
