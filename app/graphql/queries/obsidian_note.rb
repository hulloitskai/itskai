# typed: true
# frozen_string_literal: true

module Queries
  class ObsidianNote < BaseQuery
    extend T::Sig
    extend T::Helpers

    # == Type ==
    type Types::ObsidianNoteType, null: true

    # == Arguments ==
    argument :id, ID

    sig { params(id: String).returns(T.nilable(::ObsidianNote)) }
    def resolve(id:)
      ::ObsidianNote
        .find_by(id: id)
        .try! do |note|
          note = T.let(note, ::ObsidianNote)
          note if allowed_to?(:show?, note)
        end
    end
  end
end
