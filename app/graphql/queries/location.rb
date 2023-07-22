# typed: true
# frozen_string_literal: true

module Queries
  class Location < BaseQuery
    # == Configuration
    description "Kai's current approximate location."

    # == Type
    type Types::LocationType, null: true

    # == Resolver
    sig { returns(T.nilable(LocationLog)) }
    def resolve
      LocationLog.latest(timestamp: 6.hours.ago..)
    end
  end
end
