# typed: true
# frozen_string_literal: true

# Preview all emails at http://localhost:3000/rails/mailers/eventqr/event_mailer
module Eventqr
  class EventMailerPreview < ActionMailer::Preview
    # == Initialization
    def initialize(*args)
      super
      @event = Event.first!
    end

    # == Previews
    def qr_code_generated_email
      EventMailer.qr_code_generated_email(event)
    end

    private

    # == Attributes
    attr_reader :event
  end
end
