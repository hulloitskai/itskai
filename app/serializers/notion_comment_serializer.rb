# typed: true
# frozen_string_literal: true

class NotionCommentSerializer < ApplicationSerializer
  # == Configuration
  object_as :comment

  # == Attributes
  identifier type: :string
  attributes rich_text: { type: :"any[]" }

  attribute :created_at, type: :string do
    comment.created_time.to_time
  end

  attribute :modified_at, type: :string do
    comment.last_edited_time.to_time
  end
end
