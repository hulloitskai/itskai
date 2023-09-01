# typed: strict
# frozen_string_literal: true

module Queries
  class ICloudCredentials < BaseQuery
    # == Type
    type Types::ICloudCredentialsType, null: true

    # == Resolver
    sig { returns(T.nilable(::ICloudCredentials)) }
    def resolve
      credentials = ::ICloudCredentials.first or return
      credentials = T.let(credentials, ::ICloudCredentials)
      credentials if allowed_to?(:show?, credentials)
    end
  end
end
