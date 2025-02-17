# typed: true
# frozen_string_literal: true

class CustomDeviseFailureApp < Devise::FailureApp
  extend T::Sig

  sig { params(options: Hash).returns(Hash) }
  def i18n_options(options)
    options.merge(
      authentication_keys: I18n.t("devise.authentication_keys.email"),
    )
  end
end
