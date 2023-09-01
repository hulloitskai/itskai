# typed: strict
# frozen_string_literal: true

module Types
  class ObsidianNoteType < BaseObject
    # == Interfaces
    implements NodeType
    implements ObsidianEntryType

    # == Fields
    field :aliases, [String], null: false
    field :blurb, String
    field :content, String, null: true
    field :is_published, Boolean, null: false, method: :published?
    field :modified_at, DateTimeType, null: false
    field :plain_blurb, String
    field :references, [ObsidianEntryType], null: false
    field :tags, [String], null: false
    field :url, String, null: false

    # == Resolvers
    sig { returns(T::Array[T.all(ApplicationRecord, ObsidianEntry)]) }
    def references
      references = request_references.load
      unresolved_references = request_unresolved_references.load
      all_references = T.cast(
        references + unresolved_references,
        T::Array[T.all(ApplicationRecord, ObsidianEntry)],
      )
      all_references.sort_by!(&:name)
    end

    sig { returns(T.nilable(String)) }
    def content
      object.content if allowed_to?(:read?, object)
    end

    sig { returns(String) }
    def url
      raise NotImplementedError
      # obsidian_note_url(object)
    end

    # == Helpers
    sig { override.returns(ObsidianNote) }
    def object = super

    private

    # == Helpers
    sig { returns(GraphQL::Dataloader::RequestAll) }
    def request_references
      references = authorized_scope(object.references)
      dataloader
        .with(Sources::RecordById, ObsidianNote)
        .request_all(references.ids)
    end

    sig { returns(GraphQL::Dataloader::RequestAll) }
    def request_unresolved_references
      unresolved_references = authorized_scope(object.unresolved_references)
      dataloader
        .with(Sources::RecordById, ObsidianStub)
        .request_all(unresolved_references.ids)
    end
  end
end
