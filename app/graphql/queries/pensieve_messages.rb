# typed: strict
# frozen_string_literal: true

module Queries
  class PensieveMessages < BaseQuery
    # == Type
    type [Types::PensieveMessageType], null: false

    # == Arguments
    argument :to, String, required: false

    # == Resolver
    sig do
      params(to: T.nilable(String)).returns(T::Enumerable[::PensieveMessage])
    end
    def resolve(to: nil)
      messages = ::PensieveMessage.where(to:)
      to ? messages.order(timestamp: :desc) : messages.recent
    end
  end
end
