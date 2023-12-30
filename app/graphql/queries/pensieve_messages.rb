# typed: strict
# frozen_string_literal: true

module Queries
  class PensieveMessages < BaseQuery
    # == Definition
    type [Types::PensieveMessageType], null: false

    # == Arguments
    argument :to, String, required: false

    # == Resolver
    sig do
      params(to: T.nilable(String)).returns(T::Enumerable[::PensieveMessage])
    end
    def resolve(to: nil)
      messages = T.cast(
        authorized_scope(::PensieveMessage.all),
        ::PensieveMessage::PrivateRelation,
      )
      messages = messages.where(to:)
      to ? messages.order(timestamp: :desc) : messages.recent
    end
  end
end
