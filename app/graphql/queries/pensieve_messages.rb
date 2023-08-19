# typed: true
# frozen_string_literal: true

module Queries
  class PensieveMessages < BaseQuery
    include AllowsFailedLoads

    # == Type
    type [Types::PensieveMessageType], null: false

    # == Resolver
    sig { returns(T::Enumerable[::PensieveMessage]) }
    def resolve
      PensieveMessage
        .where("timestamp > ?", 12.hours.ago)
        .order(:timestamp)
        .limit(200)
    end
  end
end
