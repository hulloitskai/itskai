# typed: true
# frozen_string_literal: true

module Queries
  class ICloudCredentials < BaseQuery
    # == Type
    type Types::ICloudCredentialsType, null: true

    # == Resolver
    sig { returns(T.nilable(::ICloudCredentials)) }
    def resolve
      if (credentials = ::ICloudCredentials.first)
        credentials = T.let(credentials, ::ICloudCredentials)
        credentials if allowed_to?(:show?, credentials)
      end
    end
  end
end
