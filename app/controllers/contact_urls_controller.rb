# typed: true
# frozen_string_literal: true

class ContactUrlsController < ApplicationController
  # == Actions
  # GET /contact_url?subject=...&body=...
  def show
    contact_url_params = ContactUrlParameters.new(params)
    contact_url_params.validate!
    mailto_uri = Addressable::URI.parse("mailto:#{Contact.email}")
    mailto_uri.query_values = contact_url_params.mailto_params
    sms_uri = Addressable::URI.parse("sms:#{Contact.phone}")
    sms_uri.query_values = contact_url_params.sms_params
    render(json: { mailto: mailto_uri.to_s, sms: sms_uri.to_s })
  end
end
