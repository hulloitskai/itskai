# typed: true
# frozen_string_literal: true

class NonCanonicalHostConstraint
  extend T::Sig

  # == Constraint
  sig { params(request: ActionDispatch::Request).returns(T::Boolean) }
  def matches?(request)
    if (host = canonical_host)
      return true if request.host != host
    end
    request.port != canonical_port
  end

  private

  # == Helpers
  sig { returns(T::Hash[Symbol, T.untyped]) }
  def default_url_options
    @default_url_options = T.let(@default_url_options,
                                 T.nilable(T::Hash[Symbol, T.untyped]))
    @default_url_options ||= Rails.application.routes.default_url_options
  end

  sig { returns(Integer) }
  def default_port
    default_url_options[:protocol] == "https" ? 443 : 80
  end

  sig { returns(T.nilable(String)) }
  def canonical_host = default_url_options[:host]

  sig { returns(Integer) }
  def canonical_port
    default_url_options[:port] || default_port
  end
end
