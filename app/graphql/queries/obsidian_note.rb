# typed: strict
# frozen_string_literal: true

module Queries
  class ObsidianNote < BaseQuery
    include AllowsFailedLoads

    # == Type
    type Types::ObsidianNoteType, null: true

    # == Arguments
    argument :id, ID, loads: Types::ObsidianNoteType, as: :note

    # == Resolver
    sig do
      params(
        note: T.nilable(::ObsidianNote),
      ).returns(T.nilable(::ObsidianNote))
    end
    def resolve(note:)
      return unless note
      note if allowed_to?(:show?, note)
    end
  end
end
