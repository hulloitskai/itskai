# typed: strict
# frozen_string_literal: true

class UserMailer < ApplicationMailer
  sig { params(user: User).returns(Mail::Message) }
  def welcome_email(user)
    mail(
      inertia: "UserWelcomeEmail",
      props: {
        user: UserSerializer.render(user),
      },
      to: user.email_with_name,
      subject: "Welcome to my website :)",
    )
  end
end
