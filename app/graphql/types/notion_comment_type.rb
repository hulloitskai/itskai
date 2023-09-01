# typed: strict
# frozen_string_literal: true

module Types
  class NotionCommentType < BaseObject
    # == Fields
    field :created_at, DateTimeType, null: false
    field :id, String, null: false
    field :modified_at, DateTimeType, null: false
    field :rich_text, GraphQL::Types::JSON, null: false

    # == Resolvers
    sig { returns(Time) }
    def created_at
      object.created_time.to_time
    end

    sig { returns(Time) }
    def modified_at
      object.last_edited_time.to_time
    end
  end
end
