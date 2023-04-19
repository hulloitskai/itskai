# typed: true
# frozen_string_literal: true

module Queries
  class JournalEntryComments < BaseQuery
    # == Arguments
    argument :entry_id, String, required: false
    argument :page_size, Integer, required: false
    argument :start_cursor, String, required: false

    # == Type
    type Types::NotionCommentListingType, null: false

    # == Resolver
    sig do
      params(entry_id: String, options: T.untyped).returns(T.untyped)
    end
    def resolve(entry_id:, **options)
      NotionService.client.retrieve_comments(block_id: entry_id, **options)
    end
  end
end
