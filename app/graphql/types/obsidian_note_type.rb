# typed: strict
# frozen_string_literal: true

module Types
  class ObsidianNoteType < BaseObject
    # == Interfaces ==
    implements GraphQL::Types::Relay::Node
    implements ObsidianEntryType

    # == Fields ==
    field :aliases, [String], null: false
    field :content, String, null: false
    field :modified_at, DateTimeType, null: false
    field :referenced_by, [ObsidianNoteType], null: false
    field :references, [ObsidianEntryType], null: false
    field :tags, [String], null: false

    # == Resolvers ==
    sig { returns(T::Array[T.all(ApplicationRecord, ObsidianEntry)]) }
    def references
      references = authorized_scope(object.references)
      unresolved_references = authorized_scope(object.unresolved_references)
      references = references.to_a + unresolved_references.to_a
      references =
        T.let(references, T::Array[T.all(ApplicationRecord, ObsidianEntry)])
      references.sort_by!(&:name)
    end
  end
end
