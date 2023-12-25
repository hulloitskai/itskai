# typed: strict
# frozen_string_literal: true

module Queries
  class GoogleTimelineActivities < BaseQuery
    # == Type
    type [Types::GoogleTimelineActivityType], null: false

    # == Resolver
    sig { returns(T::Enumerable[GoogleTimelineActivity]) }
    def resolve
      GoogleTimelineActivity.order(:duration)
    end
  end
end
