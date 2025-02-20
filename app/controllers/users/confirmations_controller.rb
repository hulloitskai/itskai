# typed: true
# frozen_string_literal: true

module Users
  class ConfirmationsController < Devise::ConfirmationsController
    # == Actions
    # GET /account/email_verification?confirmation_token=abcdef
    def show
      confirmation_token = params.fetch(:confirmation_token)
      resource = T.let(
        resource_class.confirm_by_token(confirmation_token),
        User,
      )
      if resource.errors.empty?
        set_flash_message!(:notice, :confirmed)
        redirect_to(after_confirmation_path_for(resource_name, resource))
      else
        message = resource.errors.full_messages.first!
        redirect_to(
          new_confirmation_path(resource),
          alert: "Couldn't verify email: #{message}",
        )
      end
    end

    # GET /account/email_verification/resend
    def new
      render(inertia: "RequestEmailVerificationPage")
    end

    # POST /account/email_verification
    def create
      resource = self.resource = resource_class
        .send_confirmation_instructions(resource_params)
      if successfully_sent?(resource)
        render(json: {})
      else
        render(
          json: { errors: resource.form_errors },
          status: :unprocessable_entity,
        )
      end
    end
  end
end
