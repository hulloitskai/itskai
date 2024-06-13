# typed: true
# frozen_string_literal: true

module Users
  class PasswordsController < Devise::PasswordsController
    # == Actions
    # GET /password/reset
    def new
      render(inertia: "RequestPasswordResetPage")
    end

    # GET /password/change?reset_password_token=abcdef
    def edit
      reset_password_token = T.let(params.fetch(:reset_password_token), String)
      render(
        inertia: "ChangePasswordPage",
        props: { "resetPasswordToken" => reset_password_token },
      )
    end

    # POST /password
    def create
      resource = self.resource = resource_class
        .send_reset_password_instructions(resource_params)
      if successfully_sent?(resource)
        redirect_to(
          after_sending_reset_password_instructions_path_for(resource_name),
        )
      else
        redirect_to(
          new_password_path(resource_name),
          inertia: {
            errors: resource.form_errors,
          },
        )
      end
    end
  end
end
