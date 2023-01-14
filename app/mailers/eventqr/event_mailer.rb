# typed: strict
# frozen_string_literal: true

module Eventqr
  class EventMailer < ApplicationMailer
    sig { params(event: Event).returns(Mail::Message) }
    def qr_code_generated_email(event)
      @event = T.let(@event, T.nilable(Event))
      @event = event
      @inviter_name = T.let(@event.inviter_name, T.nilable(String))
      mail(
        to: @event.inviter_email_with_name,
        subject: "A QR code has been generated for your event",
      )
    end
  end
end
