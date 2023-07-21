# typed: true
# frozen_string_literal: true

module Queries
  class Timezone < BaseQuery
    # == Configuration
    description "Kai's current timezone."

    # == Type
    type Types::TimezoneType, null: false

    # == Resolver
    sig { returns(TZInfo::DataTimezone) }
    def resolve
      @zone ||= if (zone = ENV["OWNER_TIMEZONE"].presence)
        TZInfo::Timezone.get(zone)
      else
        raise GraphQL::ExecutionError, "Owner timezone not set."
      end
    end
  end
end
