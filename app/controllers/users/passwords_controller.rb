# typed: true
# frozen_string_literal: true

module Users
  class PasswordsController < Devise::PasswordsController
    # == Actions
    # GET /<resource>/password/reset
    def new
      render(inertia: "UserRequestPasswordResetPage")
    end

    # GET /<resource>/password/change?reset_password_token=abcdef
    def edit
      reset_password_token = params.fetch(:reset_password_token)
      render(
        inertia: "UserChangePasswordPage",
        props: { reset_password_token: },
      )
    end
  end
end
