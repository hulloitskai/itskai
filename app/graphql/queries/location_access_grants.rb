# typed: strict
# frozen_string_literal: true

module Queries
  class LocationAccessGrants < BaseQuery
    # == Type
    type [Types::LocationAccessGrantType], null: false

    # == Resolver
    sig { returns(T::Enumerable[::LocationAccessGrant]) }
    def resolve
      ::LocationAccessGrant.where("expires_at > NOW()")
    end
  end
end
