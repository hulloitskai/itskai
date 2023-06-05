# typed: true
# frozen_string_literal: true

module Queries
  class HomepageJournalEntry < BaseQuery
    include AllowsFailedLoads

    # == Type
    type Types::JournalEntryType, null: true

    # == Arguments
    argument :id, ID,
             required: false,
             loads: Types::JournalEntryType,
             as: :entry

    # == Resolver
    sig do
      params(entry: T.nilable(JournalEntry)).returns(T.nilable(JournalEntry))
    end
    def resolve(entry:)
      return entry if entry&.blocks?
      JournalEntry.with_blocks.order(started_at: :desc).first
    end
  end
end
