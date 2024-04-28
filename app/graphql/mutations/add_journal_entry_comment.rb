# typed: strict
# frozen_string_literal: true

module Mutations
  class AddJournalEntryComment < BaseMutation
    # == Fields
    field :comment, Types::NotionCommentType, null: false

    # == Arguments
    argument :entry_id, ID, loads: Types::JournalEntryType
    argument :text, String

    # == Resolver
    sig do
      params(entry: JournalEntry, text: String).returns({
        comment: Notion::Messages::Message,
      })
    end
    def resolve(entry:, text:)
      comment = entry.create_notion_comment(text)
      { comment: }
    end
  end
end
