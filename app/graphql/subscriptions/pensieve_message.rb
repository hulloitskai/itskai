# typed: strict
# frozen_string_literal: true

module Subscriptions
  class PensieveMessage < BaseSubscription
    # == Configuration
    broadcastable false

    # == Type
    type Types::PensieveMessageType, null: true

    # == Arguments
    argument :to, String, required: false

    # == Callback Handlers
    sig { params(to: T.nilable(String)).returns(T.nilable(::CurrentlyPlaying)) }
    def subscribe(to: nil) = nil
  end
end
