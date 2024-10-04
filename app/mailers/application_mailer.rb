# typed: strict
# frozen_string_literal: true

class ApplicationMailer < ActionMailer::Base
  extend T::Sig
  extend T::Helpers
  include Routing

  # == Configuration
  default from: :default_from, reply_to: :default_reply_to
  layout "mailer"

  protected

  # == Helpers
  sig { returns(String) }
  def default_from
    credentials.from!
  end

  sig { returns(T.nilable(String)) }
  def default_reply_to
    credentials.reply_to
  end

  private

  # == Helpers
  sig { params(value: T.untyped).returns(T.untyped) }
  def compute_default(value)
    value.is_a?(Symbol) ? send(value) : super
  end

  sig { returns(T.untyped) }
  private_class_method def self.credentials
    Rails.application.credentials.mailer!
  end
  delegate :credentials, to: :class
end
