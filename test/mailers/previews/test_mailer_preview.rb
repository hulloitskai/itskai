# typed: true
# frozen_string_literal: true

# Preview all emails at http://localhost:3000/rails/mailers/test_mailer
class TestMailerPreview < ActionMailer::Preview
  def test_email
    model = TestModel.new(name: "George", birthday: Date.new(1990, 1, 1))
    TestMailer.test_email(model)
  end
end
