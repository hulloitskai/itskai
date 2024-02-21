# typed: strict
# frozen_string_literal: true

module Queries
  class LocationAccessGrants < BaseQuery
    # == Definition
    type [Types::LocationAccessGrantType], null: false

    # == Resolver
    sig { returns(T::Enumerable[::LocationAccessGrant]) }
    def resolve
      grants = authorized_scope(::LocationAccessGrant.all)
      grants.valid
    end
  end
end
