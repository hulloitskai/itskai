# typed: true
# frozen_string_literal: true

module Mutations
  class SyncJournal < BaseMutation
    # == Payload
    class Payload < T::Struct; end

    # == Resolver
    sig { override.returns(Payload) }
    def resolve
      authorize!(to: :sync?, with: JournalPolicy)
      JournalService.sync
      Payload.new
    end
  end
end
