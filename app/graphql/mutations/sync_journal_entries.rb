# typed: true
# frozen_string_literal: true

module Mutations
  class SyncJournalEntries < BaseMutation
    # == Payload
    class Payload < T::Struct; end

    # == Resolver
    sig { override.returns(Payload) }
    def resolve
      authorize!(to: :sync?, with: JournalPolicy)
      JournalEntriesService.sync
      Payload.new
    end
  end
end
