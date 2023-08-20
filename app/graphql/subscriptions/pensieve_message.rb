# typed: true
# frozen_string_literal: true

module Subscriptions
  class PensieveMessage < BaseSubscription
    # == Configuration
    broadcastable false

    # == Type
    type Types::PensieveMessageType, null: true

    # == Callback Handlers
    sig { returns(T.nilable(::CurrentlyPlaying)) }
    def subscribe = nil
  end
end
