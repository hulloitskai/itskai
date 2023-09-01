# typed: strict
# frozen_string_literal: true

class UserMailer < ApplicationMailer
  sig { params(user: User).returns(Mail::Message) }
  def welcome_email(user)
    user_id = user.to_gid.to_s
    data = query!("UserWelcomeEmailQuery", { user_id: })
    mail(
      inertia: "UserWelcomeEmail",
      props: { data: },
      to: user.email_with_name,
      subject: "Welcome to my website :)",
    )
  end
end
