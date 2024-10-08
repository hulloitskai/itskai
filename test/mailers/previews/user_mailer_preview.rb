# typed: true
# frozen_string_literal: true

# Preview all emails at http://localhost:3000/rails/mailers/user_mailer
class UserMailerPreview < ActionMailer::Preview
  def welcome_email
    user = User.new(name: "Kai", email: "kai@example.com")
    UserMailer.welcome_email(user)
  end
end
