# typed: true
# frozen_string_literal: true

module Queries
  class ObsidianNote < BaseQuery
    # == Type
    type Types::ObsidianNoteType, null: true

    # == Arguments
    argument :id, ID

    # == Resolver
    sig { params(id: String).returns(T.nilable(::ObsidianNote)) }
    def resolve(id:)
      note = T.let(object_from_id(Types::ObsidianNoteType, id, context),
                   T.nilable(::ObsidianNote))
      note.try! do |note|
        note = T.let(note, ::ObsidianNote)
        note if allowed_to?(:show?, note)
      end
    end
  end
end
