# typed: strict
# frozen_string_literal: true

module Mutations
  class LikePensieveMessage < BaseMutation
    # == Payload
    class Payload < T::Struct
      const :message, PensieveMessage
    end

    # == Fields
    field :message, Types::PensieveMessageType, null: false

    # == Arguments
    argument :message_id, ID, loads: Types::PensieveMessageType

    # == Resolver
    sig { params(message: PensieveMessage).returns(Payload) }
    def resolve(message:)
      ActiveRecord::Base.transaction do
        message.like!(actor_id:) unless message.liked_by?(actor_id:)
      end
      Payload.new(message:)
    end
  end
end
