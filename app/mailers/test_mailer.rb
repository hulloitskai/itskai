# typed: strict
# frozen_string_literal: true

require "contact"

class TestMailer < ApplicationMailer
  sig do
    params(model: TestModel, current_user: T.nilable(User))
      .returns(Mail::Message)
  end
  def test_email(model, current_user: nil)
    data = query!("TestEmailQuery", {
      user_id: current_user ? current_user.to_gid.to_s : "",
      has_user: current_user.present?,
    })
    mail(
      to: Contact.email!,
      subject: "It's Kai!",
      inertia: "TestEmail",
      props: {
        model: model.to_h,
        data:,
      },
    )
  end
end
