# typed: strict
# frozen_string_literal: true

class ApplicationMailer < ActionMailer::Base
  extend T::Sig
  extend T::Helpers

  # == Configuration
  default from: ENV["RAILS_MAILER_FROM"], reply_to: ENV["RAILS_MAILER_REPLY_TO"]
  layout "mailer"
  helper MailerHelper
end
