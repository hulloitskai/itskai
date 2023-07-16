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
      if (note = ::ObsidianNote.find_by(name:))
        note if allowed_to?(:show?, note)
      end
    end
  end
end
