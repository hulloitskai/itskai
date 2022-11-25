# typed: strict
# frozen_string_literal: true

module Types
  class ObsidianNoteType < BaseObject
    # == Interfaces ==
    implements GraphQL::Types::Relay::Node
    implements IdentifiableType
    implements ObsidianEntryType

    # == Fields ==
    field :aliases, [String], null: false
    field :blurb, String
    field :content, String, null: true
    field :modified_at, DateTimeType, null: false
    field :references, [ObsidianEntryType], null: false
    field :tags, [String], null: false

    # == Resolvers ==
    sig { returns(T::Array[T.all(ApplicationRecord, ObsidianEntry)]) }
    def references
      references = authorized_scope(object.references)
      unresolved_references = authorized_scope(object.unresolved_references)
      references = references.to_a.concat(unresolved_references.to_a)
      references =
        T.let(references, T::Array[T.all(ApplicationRecord, ObsidianEntry)])
      references.sort_by!(&:name)
    end

    sig { returns(T.nilable(String)) }
    def content
      object.content if allowed_to?(:read?, object)
    end
  end
end
