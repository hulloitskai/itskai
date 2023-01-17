# typed: strict
# frozen_string_literal: true

module Users
  class ConfirmationsController < Devise::ConfirmationsController
    # == Actions
    # GET /<resource>/verification/resend
    sig { override.void }
    def new
      data = query!("UserSendEmailVerificationInstructionsPageQuery")
      render(
        inertia: "UserSendEmailVerificationInstructionsPage",
        props: { data: },
      )
    end
  end
end
