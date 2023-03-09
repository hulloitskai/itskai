# typed: true
# frozen_string_literal: true

module MailerHelper
  extend T::Sig
  extend T::Helpers

  # == Annotations
  abstract!

  # == Interface
  sig { abstract.returns(T::Hash[Symbol, T.untyped]) }
  def url_options; end

  # == Methods
  sig { returns(String) }
  def domain
    url_options[:host]
  end
end
