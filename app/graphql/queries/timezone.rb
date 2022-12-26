# typed: strict
# frozen_string_literal: true

module Queries
  class Timezone < BaseQuery
    extend T::Sig
    extend T::Helpers

    description "Kai's current timezone."
    type Types::TimezoneType, null: false

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
