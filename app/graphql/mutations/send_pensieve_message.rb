# typed: strict
# frozen_string_literal: true

module Mutations
  class SendPensieveMessage < BaseMutation
    # == Fields
    field :user, Types::PensieveMessageType, null: false

    # == Arguments
    argument :text, String

    # == Resolver
    sig { params(text: String).returns({ message: PensieveMessage }) }
    def resolve(text:)
      message = PensieveMessage.new(text:, from: :bot)
      message.send!
      { message: }
    rescue ActiveRecord::RecordInvalid => error
      raise GraphQL::ExecutionError, error.record.errors.full_messages.first!
    end
  end
end
