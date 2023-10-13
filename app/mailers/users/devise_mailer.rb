# typed: strict
# frozen_string_literal: true

module Users
  class DeviseMailer < Devise::Mailer
    protected :default_sender

    # == Emails
    sig do
      override
        .params(record: User, token: String, opts: T::Hash[Symbol, T.untyped])
        .returns(Mail::Message)
    end
    def confirmation_instructions(record, token, opts = {})
      user_id = record.to_gid.to_s
      data = query!("UserEmailVerificationEmailQuery", { user_id: })
      verification_url = user_confirmation_url(confirmation_token: token)
      devise_mail(record, :confirmation_instructions, opts.merge({
        inertia: "UserEmailVerificationEmail",
        props: {
          verification_url:,
          data:,
        },
      }))
    end

    sig do
      override
        .params(record: User, token: String, opts: T::Hash[Symbol, T.untyped])
        .returns(Mail::Message)
    end
    def reset_password_instructions(record, token, opts = {})
      user_id = record.to_gid.to_s
      data = query!("UserPasswordResetEmailQuery", { user_id: })
      reset_url = edit_user_password_url(reset_password_token: token)
      devise_mail(record, :reset_password_instructions, opts.merge({
        inertia: "UserPasswordResetEmail",
        props: {
          reset_url:,
          data:,
        },
      }))
    end

    sig do
      override
        .params(record: User, opts: T::Hash[Symbol, T.untyped])
        .returns(Mail::Message)
    end
    def email_changed(record, opts = {})
      user_id = record.to_gid.to_s
      data = query!("UserEmailChangedEmailQuery", { user_id: })
      devise_mail(record, :email_changed, opts.merge({
        inertia: "UserEmailChangedEmail",
        props: { data: },
      }))
    end

    sig do
      override
        .params(record: User, opts: T::Hash[Symbol, T.untyped])
        .returns(Mail::Message)
    end
    def password_change(record, opts = {})
      user_id = record.to_gid.to_s
      data = query!("UserPasswordChangedEmailQuery", { user_id: })
      devise_mail(record, :password_change, opts.merge({
        inertia: "UserPasswordChangedEmail",
        props: { data: },
      }))
    end
  end
end
