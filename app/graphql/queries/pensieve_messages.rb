# typed: strict
# frozen_string_literal: true

module Queries
  class PensieveMessages < BaseQuery
    # == Type
    type [Types::PensieveMessageType], null: false

    # == Resolver
    sig { returns(T::Enumerable[::PensieveMessage]) }
    def resolve
      ::PensieveMessage.recent
    end
  end
end
