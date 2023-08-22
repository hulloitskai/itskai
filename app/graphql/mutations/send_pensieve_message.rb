# typed: true
# frozen_string_literal: true

module Mutations
  class SendPensieveMessage < BaseMutation
    # == Payload
    class Payload < T::Struct
      const :message, PensieveMessage
    end

    # == Fields
    field :user, Types::PensieveMessageType, null: false

    # == Arguments
    argument :text, String

    # == Resolver
    sig { override.params(text: String).returns(Payload) }
    def resolve(text:)
      message = PensieveMessage.new(text:, from: :bot)
      message.send!
      Payload.new(message:)
    end
  end
end