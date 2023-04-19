# typed: true
# frozen_string_literal: true

module Types
  class NotionPageType < BaseObject
    # == Fields
    field :blocks, [GraphQL::Types::JSON], null: false
    field :created_at, DateTimeType, null: false
    field :id, String, null: false
    field :modified_at, DateTimeType, null: false
    field :title, String, null: false

    sig { returns(T::Array[T.untyped]) }
    def blocks
      JournalService.retrieve_entry_blocks(entry: self)
    end

    sig { returns(Time) }
    def created_at
      object.properties["Created At"].created_time.to_time
    end

    sig { returns(Time) }
    def modified_at
      object.properties["Modified At"].last_edited_time.to_time
    end

    sig { returns(String) }
    def title
      property = object.properties["Name"]["title"].first
      property.plain_text
    end
  end
end
