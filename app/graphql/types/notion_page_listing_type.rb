# typed: true
# frozen_string_literal: true

module Types
  class NotionPageListingType < BaseObject
    # == Fields
    field :items, [NotionPageType], null: false, hash_key: :results
    field :next_cursor, String
  end
end
