# typed: true
# frozen_string_literal: true

module Queries
  class NotionComments < BaseQuery
    # == Arguments
    argument :block_id, String, required: false
    argument :page_size, Integer, required: false
    argument :start_cursor, String, required: false

    # == Type
    type Types::NotionCommentListingType, null: false

    # == Resolver
    sig do
      params(options: T.untyped).returns(T.untyped)
    end
    def resolve(**options)
      NotionService.client.retrieve_comments(**options)
    end
  end
end
