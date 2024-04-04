# typed: strict
# frozen_string_literal: true

module Mutations
  class CreateLocationAccess < BaseMutation
    # == Payload
    class Payload < T::Struct
      const :access, LocationAccess
    end

    # == Fields
    field :access, Types::LocationAccessType, null: false

    # == Arguments
    argument :password, String, required: true

    # == Resolver
    sig { params(password: String).returns(Payload) }
    def resolve(password:)
      grant = LocationAccessGrant.valid.find_by(password:) or
        raise GraphQL::ExecutionError, "Password is invalid or expired."
      access = grant.accesses.create!
      Payload.new(access:)
    end
  end
end
