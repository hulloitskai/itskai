# typed: true
# frozen_string_literal: true

module Types
  class NotionPageListingType < BaseObject
    # == Fields
    field :next_cursor, String
    field :pages, [NotionPageType], null: false, hash_key: :results
  end
end
