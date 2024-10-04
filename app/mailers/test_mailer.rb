# typed: strict
# frozen_string_literal: true

class TestMailer < ApplicationMailer
  sig do
    params(model: TestModel, current_user: T.nilable(User))
      .returns(Mail::Message)
  end
  def test_email(model, current_user: nil)
    mail(
      to: Contact.email,
      subject: "It's Kai!",
      inertia: "TestEmail",
      props: {
        model: model.to_h,
        user: UserSerializer.one_if(current_user),
      },
    )
  end
end
