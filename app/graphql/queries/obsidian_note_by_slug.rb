# typed: true
# frozen_string_literal: true

module Queries
  class ObsidianNoteBySlug < BaseQuery
    extend T::Sig
    extend T::Helpers

    # == Type
    type Types::ObsidianNoteType, null: true

    # == Arguments
    argument :slug, String

    sig { params(slug: String).returns(T.nilable(::ObsidianNote)) }
    def resolve(slug:)
      ::ObsidianNote
        .find_by(slug:)
        .try! do |note|
          note = T.let(note, ::ObsidianNote)
          note if allowed_to?(:show?, note)
        end
    end
  end
end
