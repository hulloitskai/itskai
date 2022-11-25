# typed: strict
# frozen_string_literal: true

class ApplicationMailer < ActionMailer::Base
  default from: "RoboKai <robot@itskai.me>", reply_to: "Kai <hullo@itskai.me>"
  layout "mailer"
end
