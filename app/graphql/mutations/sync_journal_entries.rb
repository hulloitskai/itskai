# typed: strict
# frozen_string_literal: true

module Mutations
  class SyncJournalEntries < BaseMutation
    # == Payload
    class Payload < T::Struct; end

    # == Resolver
    sig { returns(Payload) }
    def resolve
      authorize!(to: :sync?, with: JournalEntryPolicy)
      JournalEntry.sync!
      Payload.new
    end
  end
end
