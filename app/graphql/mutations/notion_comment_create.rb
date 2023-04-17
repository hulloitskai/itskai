# typed: true
# frozen_string_literal: true

module Mutations
  class NotionCommentCreate < BaseMutation
    # == Payload
    class Payload < T::Struct
      const :comment, Notion::Messages::Message
    end

    # == Arguments
    argument :page_id, String
    argument :text, String

    # == Resolver
    sig { override.params(page_id: String, text: String).returns(Payload) }
    def resolve(page_id:, text:)
      comment = NotionService.client.create_comment(
        parent: { page_id: },
        rich_text: [{ text: { content: text } }],
      )
      Payload.new(comment:)
    end
  end
end
