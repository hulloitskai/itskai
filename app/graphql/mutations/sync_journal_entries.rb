# typed: strict
# frozen_string_literal: true

module Mutations
  class SyncJournalEntries < BaseMutation
    # == Resolver
    sig { returns({}) }
    def resolve
      authorize!(to: :sync?, with: JournalEntryPolicy)
      JournalEntry.sync!
      {}
    end
  end
end
