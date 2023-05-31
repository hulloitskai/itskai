# typed: true
# frozen_string_literal: true

module Mutations
  class SyncAllObsidianNotes < BaseMutation
    # == Payload
    class Payload < T::Struct; end

    # == Arguments
    argument :force, Boolean, required: false

    # == Resolver
    sig { override.params(force: T::Boolean).returns(Payload) }
    def resolve(force: false)
      authorize!(to: :sync?, with: ObsidianNotePolicy)
      ObsidianNote.sync_all_later(force:)
      Payload.new
    end
  end
end
