# typed: true
# frozen_string_literal: true

class ContactUrlsController < ApplicationController
  # == Actions
  # GET /contact_url?subject=...&body=...
  def show
    contact_url_params = ContactUrlParameters.new(params)
    contact_url_params.validate!
    email = Contact.email or raise "Missing contact email"
    mailto = Addressable::URI.parse("mailto:#{email}")
    mailto.query_values = contact_url_params.to_h.compact_blank
    render(json: { mailto: mailto.to_s })
  end
end
