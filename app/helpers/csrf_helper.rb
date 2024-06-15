# frozen_string_literal: true

module CsrfHelper
  def csrf_prop
    {
      param: request_forgery_protection_token,
      token: form_authenticity_token,
    }
  end
end
