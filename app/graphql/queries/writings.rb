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
        page_size: T.nilable(Integer),
        start_cursor: T.nilable(String),
      ).returns(T.untyped)
    end
    def resolve(page_size: nil, start_cursor: nil)
      NotionService.entries(published: true, page_size:, start_cursor:)
    end
  end
end
