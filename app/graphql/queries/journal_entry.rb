# typed: strict
# frozen_string_literal: true

module Queries
  class JournalEntry < BaseQuery
    include AllowsFailedLoads

    # == Type
    type Types::JournalEntryType, null: true

    # == Arguments
    argument :id, ID, loads: Types::JournalEntryType, as: :entry

    # == Resolver
    sig do
      params(entry: T.nilable(::JournalEntry))
        .returns(T.nilable(::JournalEntry))
    end
    def resolve(entry:)
      return unless entry
      entry if entry.content?
    end
  end
end
