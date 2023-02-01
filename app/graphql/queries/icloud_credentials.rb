# typed: true
# frozen_string_literal: true

module Queries
  class ICloudCredentials < BaseQuery
    # == Configuration
    description "Kai's personal iCloud credentials (#securityStartsHere)."

    # == Type
    type Types::ICloudCredentialsType, null: true

    # == Resolver
    sig { returns(T.nilable(::ICloudCredentials)) }
    def resolve
      ::ICloudCredentials.first.try! do |credentials|
        credentials = T.let(credentials, ::ICloudCredentials)
        credentials if allowed_to?(:show?, credentials)
      end
    end
  end
end
