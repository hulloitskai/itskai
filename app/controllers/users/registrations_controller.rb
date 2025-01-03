# typed: true
# frozen_string_literal: true

module Users
  class RegistrationsController < Devise::RegistrationsController
    # Constants
    ATTRIBUTES_REQUIRING_CURRING_PASSWORD = %i[email password]

    # == Filters
    before_action :configure_sign_up_params, only: :create

    # == Actions
    # GET /signup
    def new
      render(inertia: "SignupPage")
    end

    # GET /account
    def edit
      render(inertia: "AccountPage")
    end

    # POST /signup
    def create
      resource = build_resource(sign_up_params)
      if Rails.env.development? && (resource.owner? || resource.example_email?)
        resource.skip_confirmation!
      end
      if resource.save
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
        redirect_to(new_registration_path(resource_name), inertia: {
          errors: resource.form_errors,
        })
      end
    end

    # PUT /settings
    def update
      resource = self.resource = resource_class
        .to_adapter
        .get!(public_send(:"current_#{resource_name}").to_key)
      update_params = params.require(resource_name)
        .permit(:name, :avatar)
      if update_resource(resource, update_params)
        resource_param = resource_name.to_s.camelize(:lower)
        render(json: {
          resource_param => UserSerializer.one(resource),
        })
      else
        render(
          json: { errors: resource.form_errors },
          status: :unprocessable_entity,
        )
      end
    end

    # PUT /settings/email
    def change_email
      resource = resource_class
        .to_adapter
        .get!(public_send(:"current_#{resource_name}").to_key)
      update_params = params.require(resource_name)
        .permit(:email, :current_password)
      if resource.email == update_params[:email]
        update_params[:unconfirmed_email] = nil
      end
      if resource.update_with_password(update_params)
        needs_confirmation = update_needs_confirmation?(resource, nil)
        resource_param = resource_name.to_s.camelize(:lower)
        render(json: {
          resource_param => UserSerializer.one(resource),
          "emailNeedsConfirmation" => needs_confirmation,
        })
      else
        render(
          json: { errors: resource.form_errors },
          status: :unprocessable_entity,
        )
      end
    end

    # PUT /settings/password
    def change_password
      resource = resource_class
        .to_adapter
        .get!(public_send(:"current_#{resource_name}").to_key)
      if resource.update_with_password(account_update_params)
        if sign_in_after_change_password?
          bypass_sign_in(resource, scope: resource_name)
        end
        redirect_to(after_update_path_for(resource))
      else
        clean_up_passwords(resource)
        redirect_to(edit_registration_path(resource), inertia: {
          errors: resource.form_errors,
        })
      end
    end

    protected

    # == Helpers
    sig do
      params(resource: User, params: ActionController::Parameters)
        .returns(T::Boolean)
    end
    def update_resource(resource, params)
      requires_current_password = ATTRIBUTES_REQUIRING_CURRING_PASSWORD
        .any? { |attribute| params[attribute].present? }
      if requires_current_password
        resource.update_with_password(params)
      else
        resource.update_without_password(params)
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

    # == Helpers
    # sig { returns(T::Hash[String, T.untyped]) }
    # def inertia_errors
    #   error_bag = request.headers["X-Inertia-Error-Bag"]
    #   errors = resource&.input_field_errors&.to_h || {}
    #   error_bag.present? ? { error_bag => errors } : errors
    # end

    # == Filter handlers
    # If you have extra params to permit, append them to the sanitizer.
    sig { void }
    def configure_sign_up_params
      devise_parameter_sanitizer.permit(:sign_up, keys: %i[name])
    end
  end
end
