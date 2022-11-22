# typed: true
# frozen_string_literal: true

module Queries
  class ObsidianNotes < BaseQuery
    extend T::Sig
    extend T::Helpers

    type Types::ObsidianNoteType.connection_type, null: false

    sig { returns(T.nilable(ActiveRecord::Relation)) }
    def resolve
      ::ObsidianNote.order(modified_at: :desc)
    end
  end
end
