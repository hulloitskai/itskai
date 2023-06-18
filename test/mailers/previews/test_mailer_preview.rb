# typed: true
# frozen_string_literal: true

# Preview all emails at http://localhost:3000/rails/mailers/test_mailer
class TestMailerPreview < ActionMailer::Preview
  def hello_world_email
    TestMailer.hello_world_email
  end
end
