# typed: strict
# frozen_string_literal: true

module Types
  class JournalEntryType < BaseObject
    # == Interfaces
    implements NodeType

    # == Fields
    field :content, [GraphQL::Types::JSON], null: false
    field :modified_at, DateTimeType, null: false
    field :next_entry_id, ID
    field :started_at, DateTimeType, null: false
    field :title, String, null: false
    field :url, String, null: false

    # == Resolvers
    sig { returns(String) }
    def url
      root_url("entryId" => object.id!)
    end

    sig { returns(T.nilable(String)) }
    def next_entry_id
      next_entry = JournalEntry.with_content
        .where("started_at < ?", object.started_at)
        .order(started_at: :desc)
        .first
      next_entry = T.let(next_entry, T.nilable(JournalEntry))
      next_entry&.to_gid&.to_s
    end

    # == Helpers
    sig { override.returns(JournalEntry) }
    def object = super
  end
end
