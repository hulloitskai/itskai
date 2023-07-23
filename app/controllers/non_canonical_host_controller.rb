# typed: true
# frozen_string_literal: true

class NonCanonicalHostController < ApplicationController
  # == Actions
  sig { void }
  def redirect
    redirect_to(redirect_url_options, allow_other_host: true)
  end

  private

  # == Helpers
  sig { returns(T::Hash[Symbol, T.untyped]) }
  def redirect_url_options
    @redirect_url_options = T.let(@redirect_url_options,
                                  T.nilable(T::Hash[Symbol, T.untyped]))
    @redirect_url_options ||= scoped do
      url_options = default_url_options.slice(:host, :port)
      url_options[:port] ||= default_port
      url_options
    end
  end

  sig { returns(Integer) }
  def default_port
    default_url_options[:protocol] == "https" ? 443 : 80
  end
end
