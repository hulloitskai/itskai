# typed: true
# frozen_string_literal: true

module Types
  class CookieInputType < BaseInputObject
    # == Arguments
    argument :domain, String
    argument :expiration_date, Float, required: false
    argument :host_only, Boolean
    argument :http_only, Boolean
    argument :name, String
    argument :path, String
    argument :same_site, String
    argument :secure, Boolean
    argument :session, Boolean
    argument :value, String

    # == Prepare
    sig { returns(Cookie) }
    def prepare
      Cookie.new(**arguments.to_h)
    end
  end
end
