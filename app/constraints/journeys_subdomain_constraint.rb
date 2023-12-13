# typed: strict
# frozen_string_literal: true

class JourneysSubdomainConstraint
  extend T::Sig

  sig { params(request: ActionDispatch::Request).returns(T::Boolean) }
  def matches?(request)
    subdomain = T.let(request.subdomain.dup, String)
    subdomain.delete_suffix!(".127.0.0.1") if Rails.env.development?
    subdomain == "journeys"
  end
end
