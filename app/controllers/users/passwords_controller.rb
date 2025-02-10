# typed: true
# frozen_string_literal: true

module Users
  class PasswordsController < Devise::PasswordsController
    # == Actions
    # GET /account/password/reset
    def new
      render(inertia: "RequestPasswordResetPage")
    end

    # GET /account/password/change?reset_password_token=abcdef
    def edit
      reset_password_token = T.let(params.fetch(:reset_password_token), String)
      render(
        inertia: "ChangePasswordPage",
        props: { "resetPasswordToken" => reset_password_token },
      )
    end

    # POST /account/password
    def create
      resource = self.resource = resource_class
        .send_reset_password_instructions(resource_params)
      if successfully_sent?(resource)
        redirect_to(
          after_sending_reset_password_instructions_path_for(resource_name),
        )
      else
        redirect_to(new_password_path(resource_name), inertia: {
          errors: resource.form_errors,
        })
      end
    end

    # PUT/PATCH /account/password
    def update
      resource = self.resource = resource_class
        .reset_password_by_token(resource_params)
      if resource.errors.empty?
        resource.unlock_access! if unlockable?(resource)
        if resource_class.sign_in_after_reset_password
          flash_message = if resource.active_for_authentication?
            :updated
          else
            :updated_not_active
          end
          set_flash_message!(:notice, flash_message)
          resource.after_database_authentication
          sign_in(resource_name, resource)
        else
          set_flash_message!(:notice, :updated_not_active)
        end
        redirect_to(after_resetting_password_path_for(resource))
      else
        set_minimum_password_length
        redirect_to(edit_password_path(
          resource_name,
          resource_params.permit("reset_password_token"),
        ))
      end
    end
  end
end
