# typed: strict
# frozen_string_literal: true

class Users::RegistrationsController < Devise::RegistrationsController
  # == Filters ==
  before_action :configure_sign_up_params, only: :create

  # == Actions ==
  # GET /account/sign_up
  sig { override.void }
  def new
    data = query!("AccountSignUpPageQuery")
    render(inertia: "AccountSignUpPage", props: { data: data })
  end

  # POST /account
  sig { override.void }
  def create
    build_resource(sign_up_params)
    resource.save
    if resource.persisted?
      if resource.active_for_authentication?
        set_flash_message!(:notice, :signed_up)
        sign_up(resource_name, resource)
        redirect_to(after_sign_up_path_for(resource))
      else
        set_flash_message!(
          :notice,
          :"signed_up_but_#{resource.inactive_message}",
        )
        expire_data_after_sign_in!
        redirect_to(after_inactive_sign_up_path_for(resource))
      end
    else
      clean_up_passwords(resource)
      set_minimum_password_length
      redirect_to(
        new_registration_path(resource_name),
        inertia: {
          errors: inertia_errors,
        },
      )
    end
  end

  # GET /resource/edit
  sig { void }
  def edit
    data = query!("AccountEditPageQuery")
    render(inertia: "AccountEditPage", props: { data: data })
  end

  # PUT /resource
  sig { void }
  def update
    self.resource =
      resource_class.to_adapter.get!(send(:"current_#{resource_name}").to_key)
    resource_updated = update_resource(resource, account_update_params)
    if resource_updated
      if sign_in_after_change_password?
        bypass_sign_in(resource, scope: resource_name)
      end
      redirect_to(after_update_path_for(resource))
    else
      clean_up_passwords(resource)
      set_minimum_password_length
      redirect_to(
        edit_registration_path(resource_name),
        inertia: {
          errors: inertia_errors,
        },
      )
    end
  end

  # DELETE /resource
  # def destroy
  #   super
  # end

  # GET /resource/cancel
  # Forces the session data which is usually expired after sign
  # in to be expired now. This is useful if the user wants to
  # cancel oauth signing in/up in the middle of the process,
  # removing all OAuth session data.
  # def cancel
  #   super
  # end

  protected

  sig do
    override
      .params(resource: User, params: T::Hash[T.untyped, T.untyped])
      .returns(T::Boolean)
  end
  def update_resource(resource, params)
    if params[:password].present?
      resource.update_with_password(params)
    else
      attributes = params.excluding("password_confirmation", "current_password")
      if params["email"] == resource["email"]
        attributes["unconfirmed_email"] = ""
      end
      resource.update_without_password(attributes)
    end
  end

  sig { params(resource: User).returns(String) }
  def after_update_path_for(resource)
    if sign_in_after_change_password?
      edit_registration_path(resource)
    else
      new_session_path(resource_name)
    end
  end

  private

  # == Helpers ==
  sig { returns(T::Hash[String, T.untyped]) }
  def inertia_errors
    error_bag = T.let(request.headers["X-Inertia-Error-Bag"], T.nilable(String))
    errors =
      resource
        .errors
        .group_by_attribute
        .transform_keys! { |key| key.to_s.camelize(:lower) }
        .transform_values! do |errors|
          errors = T.let(errors, T::Array[ActiveModel::Error])
          error = T.must(errors.first)
          error.full_message + "."
        end
    error_bag.present? ? { error_bag => errors } : errors
  end

  # == Filters ==
  # If you have extra params to permit, append them to the sanitizer.
  sig { void }
  def configure_sign_up_params
    devise_parameter_sanitizer.permit(:sign_up, keys: %i[name])
  end

  # If you have extra params to permit, append them to the sanitizer.
  # sig { void }
  # def configure_account_update_params
  #   devise_parameter_sanitizer.permit(:account_update, keys: %i[])
  # end
end