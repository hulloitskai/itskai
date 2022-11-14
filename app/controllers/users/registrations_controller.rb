# typed: strict
# frozen_string_literal: true

class Users::RegistrationsController < Devise::RegistrationsController
  # == Filters ==
  before_action :configure_sign_up_params, only: :create
  before_action :configure_account_update_params, only: :update

  # == Actions ==
  # GET /account/sign_up
  sig { override.void }
  def new
    render(inertia: "SignUpPage")
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
          errors:
            resource
              .errors
              .group_by_attribute
              .transform_keys! { |key| key.to_s.camelize(:lower) }
              .transform_values! do |errors|
                errors = T.let(errors, T::Array[ActiveModel::Error])
                error = T.must(errors.first)
                error.full_message + "."
              end,
        },
      )
    end
  end

  # GET /resource/edit
  # def edit
  #   super
  # end

  # PUT /resource
  # def update
  #   super
  # end

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
    params(resource: User, params: T::Hash[T.untyped, T.untyped])
      .returns(T::Boolean)
  end
  def update_resource(resource, params)
    if params[:password].present?
      resource.update_with_password(params)
    else
      resource.update_without_password(
        params.excluding("password_confirmation", "current_password"),
      )
    end
  end

  sig { params(resource: User).returns(Symbol) }
  def after_update_path_for(resource)
    :user_registration
  end

  private

  # == Filters ==
  # If you have extra params to permit, append them to the sanitizer.
  sig { void }
  def configure_sign_up_params
    devise_parameter_sanitizer.permit(:sign_up, keys: %i[name])
  end

  # If you have extra params to permit, append them to the sanitizer.
  sig { void }
  def configure_account_update_params
    devise_parameter_sanitizer.permit(:account_update, keys: %i[name])
  end
end
