# typed: strict
# frozen_string_literal: true

module Queries
  class Timezone < BaseQuery
    # == Type
    type Types::TimezoneType, null: false

    # == Resolver
    sig { returns(TZInfo::DataTimezone) }
    def resolve
      @zone ||= T.let(
        if (zone = ENV["OWNER_TIMEZONE"].presence)
          TZInfo::Timezone.get(zone)
        else
          raise GraphQL::ExecutionError, "Owner timezone not set."
        end,
        T.nilable(TZInfo::Timezone),
      )
    end
  end
end
