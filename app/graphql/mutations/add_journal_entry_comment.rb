# typed: strict
# frozen_string_literal: true

module Mutations
  class AddJournalEntryComment < BaseMutation
    # == Payload
    class Payload < T::Struct
      const :comment, Notion::Messages::Message
    end

    # == Fields
    field :comment, Types::NotionCommentType, null: false

    # == Arguments
    argument :entry_id, ID, loads: Types::JournalEntryType
    argument :text, String

    # == Resolver
    sig { params(entry: JournalEntry, text: String).returns(Payload) }
    def resolve(entry:, text:)
      comment = entry.create_notion_comment(text)
      Payload.new(comment:)
    end
  end
end
