# typed: true
# frozen_string_literal: true

module Queries
  class ObsidianNoteByName < BaseQuery
    # == Type
    type Types::ObsidianNoteType, null: true

    # == Arguments
    argument :name, String

    # == Resolver
    sig { params(name: String).returns(T.nilable(::ObsidianNote)) }
    def resolve(name:)
      ::ObsidianNote
        .find_by(name:)
        .try! do |note|
          note = T.let(note, ::ObsidianNote)
          note if allowed_to?(:show?, note)
        end
    end
  end
end
