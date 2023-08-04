# typed: true
# frozen_string_literal: true

module Queries
  class Location < BaseQuery
    # == Type
    type Types::LocationLogType, null: true

    # == Resolver
    sig { returns(T.nilable(LocationLog)) }
    def resolve
      ::Location.current
    end
  end
end
