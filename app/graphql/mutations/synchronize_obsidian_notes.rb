# typed: true
# frozen_string_literal: true

module Mutations
  class SynchronizeObsidianNotes < BaseMutation
    # == Payload
    class Payload < T::Struct; end

    # == Arguments
    argument :force, Boolean, required: false

    # == Resolver
    sig { override.params(force: T::Boolean).returns(Payload) }
    def resolve(force: false)
      authorize!(to: :synchronize?, with: ObsidianNotePolicy)
      ObsidianNote.synchronize_all_later(force:)
      Payload.new
    end
  end
end
