# typed: true
# frozen_string_literal: true

module Queries
  class ObsidianNotes < BaseQuery
    extend T::Sig
    extend T::Helpers

    type Types::ObsidianNoteType.connection_type, null: false

    argument :modified_after, Types::DateTimeType, required: false
    argument :modified_before, Types::DateTimeType, required: false

    sig do
      params(modified_after: T.nilable(Time), modified_before: T.nilable(Time))
        .returns(T.nilable(ActiveRecord::Relation))
    end
    def resolve(modified_after: nil, modified_before: nil)
      notes = authorized_scope(::ObsidianNote.all)
      if modified_after.present?
        notes = notes.where("modified_at >= ?", modified_after)
      end
      if modified_before.present?
        notes = notes.where("modified_at <= ?", modified_before)
      end
      notes.order(modified_at: :desc)
    end
  end
end
