# typed: true
# frozen_string_literal: true

module Queries
  class Writings < BaseQuery
    # == Arguments
    argument :page_size, Integer, required: false
    argument :start_cursor, String, required: false

    # == Type
    type Types::NotionPageListingType, null: false

    # == Resolver
    sig do
      params(
        start_cursor: T.nilable(String),
        page_size: T.nilable(Integer),
      ).returns(T.untyped)
    end
    def resolve(start_cursor: nil, page_size: nil)
      NotionService.entries(published: true, start_cursor:, page_size:)
    end
  end
end
