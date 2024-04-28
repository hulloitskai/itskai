# typed: strict
# frozen_string_literal: true

module Mutations
  class UnlikePensieveMessage < BaseMutation
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
        message.unlike!(actor_id:) if message.liked_by?(actor_id:)
      end
      { message: }
    end
  end
end
