# typed: strict
# frozen_string_literal: true

module Mutations
  class LikePensieveMessage < BaseMutation
    # == Fields
    field :message, Types::PensieveMessageType, null: false

    # == Arguments
    argument :message_id, ID, loads: Types::PensieveMessageType

    # == Resolver
    sig do
      params(message: PensieveMessage)
        .returns({ message: PensieveMessage })
    end
    def resolve(message:)
      ActiveRecord::Base.transaction do
        message.like!(actor_id:) unless message.liked_by?(actor_id:)
      end
      { message: }
    end
  end
end
