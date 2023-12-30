# typed: strict
# frozen_string_literal: true

module Queries
  class LocationAccessGrants < BaseQuery
    # == Definition
    type [Types::LocationAccessGrantType], null: false

    # == Resolver
    sig { returns(T::Enumerable[::LocationAccessGrant]) }
    def resolve
      grants = T.cast(
        authorized_scope(::LocationAccessGrant.all),
        ::LocationAccessGrant::PrivateRelation,
      )
      grants.valid
    end
  end
end
