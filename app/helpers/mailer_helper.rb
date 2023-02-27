# typed: true
# frozen_string_literal: true

module MailerHelper
  extend T::Sig
  extend T::Helpers

  abstract!

  # == Methods
  sig { abstract.returns(T::Hash[Symbol, T.untyped]) }
  def url_options; end

  sig { returns(String) }
  def domain
    url_options[:host]
  end
end
