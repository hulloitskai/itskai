# typed: strict
# frozen_string_literal: true

module Users
  class PasswordsController < Devise::PasswordsController
    # == Actions
    # GET /<resource>/password/reset
    sig { override.void }
    def new
      data = query!("UserSendPasswordResetInstructionsPageQuery")
      render(
        inertia: "UserSendPasswordResetInstructionsPage",
        props: { data: },
      )
    end

    # GET /<resource>/password/change?reset_password_token=abcdef
    sig { override.void }
    def edit
      reset_password_token = params.fetch(:reset_password_token)
      data = query!("UserChangePasswordPageQuery")
      render(
        inertia: "UserChangePasswordPage",
        props: {
          data:,
          "resetPasswordToken" => reset_password_token,
        },
      )
    end
  end
end
