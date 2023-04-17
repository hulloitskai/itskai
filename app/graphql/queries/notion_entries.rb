# typed: true
# frozen_string_literal: true

module Queries
  class NotionEntries < BaseQuery
    # == Arguments
    argument :page_size, Integer, required: false
    argument :start_cursor, String, required: false

    # == Type
    type Types::NotionPageListingType, null: false

    # == Resolver
    sig do
      params(options: T.untyped).returns(T.untyped)
    end
    def resolve(**options)
      NotionService.entries(published: true, **options)
    end
  end
end
