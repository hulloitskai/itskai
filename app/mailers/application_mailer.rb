# typed: strict
# frozen_string_literal: true

class ApplicationMailer < ActionMailer::Base
  extend T::Sig
  extend T::Helpers
  include Routing

  # == Configuration
  default from: :default_sender, reply_to: :default_reply_to
  layout "mailer"

  # == Helpers
  sig { returns(String) }
  def default_sender
    ENV["RAILS_MAILER_FROM"].presence or raise "Missing default from address"
  end

  sig { returns(T.nilable(String)) }
  def default_reply_to
    ENV["RAILS_MAILER_REPLY_TO"].presence
  end

  private

  # == Helpers
  sig { params(value: T.untyped).returns(T.untyped) }
  def compute_default(value)
    value.is_a?(Symbol) ? send(value) : super
  end

  sig { returns(T.nilable(String)) }
  def notifications_email
    Notifications.email
  end
end
