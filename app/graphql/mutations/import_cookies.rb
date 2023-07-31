# typed: true
# frozen_string_literal: true

module Mutations
  class ImportCookies < BaseMutation
    # == Payload
    class Payload < T::Struct
      const :cookies, T::Array[Cookie]
    end

    # == Arguments
    argument :cookies, [Types::CookieInputType]
    argument :service, String, required: true

    # == Resolver
    sig do
      override
        .params(service: String, cookies: T::Array[Cookie])
        .returns(Payload)
    end
    def resolve(service:, cookies:)
      ActiveRecord::Base.transaction do
        Cookie.destroy_by(service:)
        cookies.each do |cookie|
          cookie.service = service
          cookie.save!
        end
      end
      Payload.new(cookies:)
    end
  end
end
