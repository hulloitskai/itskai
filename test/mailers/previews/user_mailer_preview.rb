# typed: true
# frozen_string_literal: true

# Preview all emails at http://localhost:3000/rails/mailers/user_mailer
class UserMailerPreview < ActionMailer::Preview
  def welcome_email
    user = User.owner || User.first!
    UserMailer.welcome_email(user)
  end
end
