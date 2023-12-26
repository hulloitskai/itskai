# typed: strict
# frozen_string_literal: true

module Queries
  class TimelineActivities < BaseQuery
    # == Type
    type [Types::TimelineActivityType], null: false

    # == Resolver
    sig { returns(T::Enumerable[TimelineActivity]) }
    def resolve
      TimelineActivity.order(:duration)
    end
  end
end
