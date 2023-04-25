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
    sig { params(entry_id: String, options: T.untyped).returns(T.untyped) }
    def resolve(entry_id:, **options)
      JournalService.list_comments(**T.unsafe({
        entry_id:,
        **options,
      }))
    end
  end
end
