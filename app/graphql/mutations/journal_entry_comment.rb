# typed: true
# frozen_string_literal: true

module Mutations
  class JournalEntryComment < BaseMutation
    # == Payload
    class Payload < T::Struct
      const :comment, Notion::Messages::Message
    end

    # == Arguments
    argument :entry_id, String
    argument :text, String

    # == Resolver
    sig { override.params(entry_id: String, text: String).returns(Payload) }
    def resolve(entry_id:, text:)
      comment = JournalService.create_comment(entry_id:, text:)
      Payload.new(comment:)
    end
  end
end
