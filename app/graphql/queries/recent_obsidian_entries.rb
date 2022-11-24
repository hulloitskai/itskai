# typed: true
# frozen_string_literal: true

module Queries
  class RecentObsidianEntries < BaseQuery
    extend T::Sig
    extend T::Helpers

    type [Types::ObsidianEntryType], null: false

    sig do
      returns(T.nilable(T::Array[T.all(ApplicationRecord, ObsidianEntry)]))
    end
    def resolve
      notes = authorized_scope(::ObsidianNote.all)
      notes = notes.order(modified_at: :desc).take(3)
      notes = T.let(notes, T::Array[::ObsidianNote])
      related_note_ids = T.let(Set.new, T::Set[String])
      related_stub_ids = T.let(Set.new, T::Set[String])
      notes.each do |note|
        related_note_ids.merge(authorized_scope(note.references).pluck(:id))
        related_note_ids.merge(authorized_scope(note.referenced_by).pluck(:id))
        related_stub_ids.merge(
          authorized_scope(note.unresolved_references).pluck(:id),
        )
      end
      related_note_ids.subtract(notes.map(&:id!))
      related_notes = ::ObsidianNote.find(related_note_ids.to_a)
      related_notes = T.let(related_notes, T::Array[::ObsidianNote])
      related_stubs = ::ObsidianStub.find(related_stub_ids.to_a)
      related_stubs = T.let(related_stubs, T::Array[::ObsidianStub])
      notes.concat(related_notes, related_stubs)
    end
  end
end
