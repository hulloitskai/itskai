# typed: true
# frozen_string_literal: true

# Preview all emails at http://localhost:3000/rails/mailers/test_mailer
class UserMailerPreview < ActionMailer::Preview
  def welcome_email
    user = User.owner!
    UserMailer.welcome_email(user:)
  end
end
