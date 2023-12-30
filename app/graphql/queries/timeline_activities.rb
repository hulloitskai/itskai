# typed: strict
# frozen_string_literal: true

module Queries
  class TimelineActivities < BaseQuery
    # == Definition
    type [Types::TimelineActivityType], null: false

    # == Arguments
    argument :after, Types::DateTimeType
    argument :before, Types::DateTimeType

    # == Resolver
    sig do
      params(after: Time, before: Time).returns(T::Enumerable[TimelineActivity])
    end
    def resolve(after:, before:)
      unless after.before?(before)
        raise GraphQL::ExecutionError, "`after' must occur prior to `before'."
      end
      activities = T.cast(
        authorized_scope(TimelineActivity.all),
        TimelineActivity::PrivateRelation,
      )
      activities
        .where("duration && tsrange(?, ?)", after, before)
        .order(:duration)
    end
  end
end
