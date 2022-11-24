# typed: true
# frozen_string_literal: true

module Queries
  class ICloudCredentials < BaseQuery
    extend T::Sig
    extend T::Helpers

    type Types::ICloudCredentialsType, null: true

    sig { returns(T.nilable(::ICloudCredentials)) }
    def resolve
      ::ICloudCredentials.first.try! do |credentials|
        credentials = T.let(credentials, ::ICloudCredentials)
        credentials if allowed_to?(:show?, credentials)
      end
    end
  end
end
