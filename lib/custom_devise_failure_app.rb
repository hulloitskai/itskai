# typed: true
# frozen_string_literal: true

class CustomDeviseFailureApp < Devise::FailureApp
  extend T::Sig

  def respond
    if http_auth?
      http_auth
    elsif request.content_type == "application/json"
      self.status = 401
      self.content_type = "application/json"
      self.response_body = { error: i18n_message(:invalid) }.to_json
    else
      redirect
    end
  end

  sig do
    params(options: T::Hash[T.untyped, T.untyped])
      .returns(T::Hash[T.untyped, T.untyped])
  end
  def i18n_options(options)
    options.merge(
      authentication_keys: I18n.t("devise.authentication_keys.email"),
    )
  end
end
