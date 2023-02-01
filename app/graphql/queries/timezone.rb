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
      unless defined?(@zone)
        @zone = T.let(@zone, T.nilable(TZInfo::DataTimezone))
        @zone = ENV["OWNER_TIMEZONE"].presence.try! do |name|
          name = T.let(name, String)
          TZInfo::Timezone.get(name)
        end
      end
      @zone or raise GraphQL::ExecutionError, "Missing contact zone"
    end
  end
end
