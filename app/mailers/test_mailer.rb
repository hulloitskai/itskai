# typed: true
# frozen_string_literal: true

class TestMailer < ApplicationMailer
  sig { returns(Mail::Message) }
  def hello_world_email
    mail(
      to: ENV.fetch("OWNER_CONTACT_EMAIL"),
      subject: "It's Kai!",
      body: "Hello, world :)",
    )
  end
end
