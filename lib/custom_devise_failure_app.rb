# typed: true
# frozen_string_literal: true

class CustomDeviseFailureApp < Devise::FailureApp
  extend T::Sig

  sig { void }
  def respond
    if request.content_type == "application/json"
      self.status = 401
      self.content_type = "application/json"
      self.response_body = { error: i18n_message(:invalid) }.to_json
    else
      super
    end
  end

  sig { params(options: Hash).returns(Hash) }
  def i18n_options(options)
    options.merge(
      authentication_keys: I18n.t("devise.authentication_keys.email"),
    )
  end
end
