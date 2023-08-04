# typed: true
# frozen_string_literal: true

module Mutations
  class AddJournalEntryComment < BaseMutation
    # == Payload
    class Payload < T::Struct
      const :comment, Notion::Messages::Message
    end

    # == Arguments
    argument :entry_id, ID, loads: Types::JournalEntryType
    argument :text, String

    # == Resolver
    sig { override.params(entry: JournalEntry, text: String).returns(Payload) }
    def resolve(entry:, text:)
      comment = entry.create_notion_comment(text)
      Payload.new(comment:)
    end
  end
end
