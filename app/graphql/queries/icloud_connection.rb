# typed: strict
# frozen_string_literal: true

module Queries
  class ICloudConnection < BaseQuery
    # == Definition
    type Types::ICloudConnectionType, null: false

    # == Resolver
    sig { returns(::ICloudConnection) }
    def resolve
      ::ICloudConnection.current
    end
  end
end
