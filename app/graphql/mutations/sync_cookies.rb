# typed: true
# frozen_string_literal: true

module Mutations
  class SyncCookies < BaseMutation
    # == Payload
    class Payload < T::Struct
      const :cookies, T::Array[Cookie]
    end

    # == Arguments
    argument :cookies, [Types::CookieInputType]

    # == Resolver
    sig { override.params(cookies: T::Array[Cookie]).returns(Payload) }
    def resolve(cookies:)
      domains = cookies.map(&:domain).uniq
      if domains.present?
        Cookie.destroy_by(domain: domains)
      end
      ActiveRecord::Base.transaction do
        cookies.each(&:save!)
      end
      Payload.new(cookies:)
    end
  end
end
