# typed: true
# frozen_string_literal: true

class ContactUrlsController < ApplicationController
  # == Actions
  def show
    email = Contact.email or raise "Missing contact email"
    mailto = helpers.mail_to(email, nil, contact_url_params.attributes)
    render(json: { mailto: })
  end

  private

  # == Helpers
  sig { returns(ContactUrlParams) }
  def contact_url_params
    @contract_url_params ||= ContactUrlParams
      .new(params.permit(*ContactUrlParams.attribute_names))
  end
end
