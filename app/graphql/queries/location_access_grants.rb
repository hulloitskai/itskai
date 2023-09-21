# typed: strict
# frozen_string_literal: true

module Queries
  class LocationAccessGrants < BaseQuery
    # == Type
    type [Types::LocationAccessGrantType], null: false

    # == Resolver
    sig { returns(T::Enumerable[::LocationAccessGrant]) }
    def resolve
      relation = ::LocationAccessGrant.valid
      authorized_scope(relation)
    end
  end
end
