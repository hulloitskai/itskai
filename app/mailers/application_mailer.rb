# typed: strict
# frozen_string_literal: true

class ApplicationMailer < ActionMailer::Base
  extend T::Sig
  extend T::Helpers
  include Querying

  # == Configuration
  default from: ENV["RAILS_MAILER_FROM"], reply_to: ENV["RAILS_MAILER_REPLY_TO"]
  layout "mailer"

  # == Querying
  sig { override.returns(T.nilable(T.any(User, Symbol))) }
  def current_user = :system
end
