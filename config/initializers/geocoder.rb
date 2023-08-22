# typed: true
# frozen_string_literal: true

Rails.application.configure do
  config.after_initialize do
    if (email = Contact.email)
      Geocoder.configure(http_headers: { "User-Agent" => email })
    end
  end
end
