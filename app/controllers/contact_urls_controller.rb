# typed: true
# frozen_string_literal: true

class ContactUrlsController < ApplicationController
  # == Actions
  # GET /contact_url
  def show
    email = Contact.email or raise "Missing contact email"
    mailto = Addressable::URI.parse("mailto:#{email}")
    mailto.query_values = contact_url_params.to_h.compact_blank
    render(json: { mailto: mailto.to_s })
  end

  private

  # == Helpers
  sig { returns(ContactUrlParams) }
  def contact_url_params
    @contract_url_params ||= ContactUrlParams
      .new(params.permit(*ContactUrlParams.attribute_names))
  end
end
