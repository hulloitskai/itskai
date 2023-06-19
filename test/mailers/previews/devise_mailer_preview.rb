# typed: true
# frozen_string_literal: true

# Preview all emails at http://localhost:3000/rails/mailers/devise_mailer
class DeviseMailerPreview < ActionMailer::Preview
  def initialize(*args)
    super
    @record = User.first!
  end

  def confirmation_instructions
    token = SecureRandom.hex
    Devise::Mailer.confirmation_instructions(record, token)
  end

  def email_changed
    Devise::Mailer.email_changed(record)
  end

  def password_change
    Devise::Mailer.password_change(record)
  end

  def reset_password_instructions
    token = SecureRandom.hex
    Devise::Mailer.reset_password_instructions(record, token)
  end

  # def unlock_instructions
  #   token = SecureRandom.hex
  #   Devise::Mailer.unlock_instructions(record, token)
  # end

  private

  attr_reader :record
end
