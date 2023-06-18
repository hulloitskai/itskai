# typed: true
# frozen_string_literal: true

module Users
  class DeviseMailer < Devise::Mailer
    sig do
      params(record: User, token: String, opts: T.untyped)
        .returns(Mail::Message)
    end
    def confirmation_instructions(record, token, opts = {})
      user_id = record.to_gid.to_s
      data = query!("UserConfirmationEmailQuery", { user_id: })
      confirmation_url = user_confirmation_url(confirmation_token: token)
      devise_mail(
        record,
        :confirmation_instructions,
        {
          inertia: "UserConfirmationEmail",
          props: { data:, confirmation_url: },
        },
      )
    end
  end
end
