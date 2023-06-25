# typed: strict
# frozen_string_literal: true

class ApplicationMailer < ActionMailer::Base
  extend T::Sig
  extend T::Helpers
  include Querying

  # == Configuration
  default from: :default_from, reply_to: ENV["RAILS_MAILER_REPLY_TO"]
  layout "mailer"

  # == Querying
  sig { override.returns(T.nilable(T.any(User, Symbol))) }
  def current_user = :system

  protected

  # == Helpers
  sig { returns(String) }
  def default_from
    return T.must(@default_from) if defined?(@default_from)
    @default_from = T.let(@default_from, T.nilable(String))
    @default_from = ENV["RAILS_MAILER_FROM"] or
      raise "Missing default from address"
  end

  private

  # == Helpers
  sig { override.params(value: T.untyped).returns(T.untyped) }
  def compute_default(value)
    value.is_a?(Symbol) ? send(value) : super
  end
end
