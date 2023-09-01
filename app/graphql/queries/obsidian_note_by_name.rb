# typed: strict
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
      note = ::ObsidianNote.find_by(name:) or return
      note if allowed_to?(:show?, note)
    end
  end
end
