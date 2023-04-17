# typed: true
# frozen_string_literal: true

module Types
  class NotionCommentListingType < BaseObject
    # == Fields
    field :items, [NotionCommentType], null: false, hash_key: :results
    field :next_cursor, String
  end
end
