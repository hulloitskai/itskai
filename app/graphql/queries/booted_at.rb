# typed: strict
# frozen_string_literal: true

module Queries
  class BootedAt < BaseQuery
    # == Configuration
    # description "When the server was booted."

    # == Definition
    type Types::DateTimeType, null: false

    # == Resolver
    sig { returns(Time) }
    def resolve
      ItsKai.application.booted_at
    end
  end
end
