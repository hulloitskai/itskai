# typed: true
# frozen_string_literal: true

class ContactUrlsController < ApplicationController
  # == Actions
  # GET /contact_url?subject=...&body=...
  def show
    email = Contact.email or raise "Missing contact email"
    mailto = Addressable::URI.parse("mailto:#{email}")
    mailto.query_values = contact_url_params.to_h.compact_blank
    render(json: { mailto: mailto.to_s })
  end

  private

  # == Helpers
  sig { returns(ContactUrlParameters) }
  def contact_url_params
    @contract_url_params ||= ContactUrlParameters.new(params)
  end
end
