# typed: strict
# frozen_string_literal: true

module Queries
  class JournalEntryComments < BaseQuery
    # == Arguments
    argument :entry_id, ID, loads: Types::JournalEntryType

    # == Type
    type [Types::NotionCommentType], null: false

    # == Resolver
    sig { params(entry: ::JournalEntry).returns(T.untyped) }
    def resolve(entry:)
      entry.notion_comments
    end
  end
end
