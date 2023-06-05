# typed: true
# frozen_string_literal: true

module Mutations
  class ImportObsidianNotes < BaseMutation
    # == Payload
    class Payload < T::Struct; end

    # == Resolver
    sig { override.returns(Payload) }
    def resolve
      authorize!(to: :import?, with: ObsidianNotePolicy)
      ObsidianNote.import_later
      Payload.new
    end
  end
end
