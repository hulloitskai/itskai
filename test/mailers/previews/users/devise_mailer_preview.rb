# typed: true
# frozen_string_literal: true

# Preview all emails at http://localhost:3000/rails/mailers/users/devise_mailer
module Users
  class DeviseMailerPreview < ActionMailer::Preview
    def initialize(*args)
      super
      @record = User.first!
    end

    def confirmation_instructions
      token = SecureRandom.hex
      Users::DeviseMailer.confirmation_instructions(record, token)
    end

    def email_changed
      Users::DeviseMailer.email_changed(record)
    end

    def password_change
      Users::DeviseMailer.password_change(record)
    end

    def reset_password_instructions
      token = SecureRandom.hex
      Users::DeviseMailer.reset_password_instructions(record, token)
    end

    # def unlock_instructions
    #   token = SecureRandom.hex
    #   Users::DeviseMailer.unlock_instructions(record, token)
    # end

    private

    attr_reader :record
  end
end
