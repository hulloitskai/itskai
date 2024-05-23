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
        props: { reset_password_token: },
      )
    end
  end
end
