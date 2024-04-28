# typed: strict
# frozen_string_literal: true

module Mutations
  class CreateLocationAccess < BaseMutation
    # == Fields
    field :access, Types::LocationAccessType, null: false

    # == Arguments
    argument :password, String, required: true

    # == Resolver
    sig { params(password: String).returns({ access: LocationAccess }) }
    def resolve(password:)
      grant = LocationAccessGrant.valid.find_by(password:) or
        raise GraphQL::ExecutionError, "Password is invalid or expired."
      access = grant.accesses.create!
      { access: }
    end
  end
end
