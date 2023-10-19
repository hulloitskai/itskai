# typed: strict
# frozen_string_literal: true

module Mutations
  class ImportJournalEntries < BaseMutation
    # == Payload
    class Payload < T::Struct; end

    # == Resolver
    sig { returns(Payload) }
    def resolve
      authorize!(to: :import?, with: JournalEntryPolicy)
      JournalEntry.import!
      Payload.new
    end
  end
end
