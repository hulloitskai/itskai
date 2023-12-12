# typed: strict
# frozen_string_literal: true

module Subscriptions
  class JourneySessionParticipation < BaseSubscription
    # == Configuration
    broadcastable false

    # == Type
    type Types::JourneySessionParticipationType, null: true

    # == Arguments
    argument :session_id, ID, loads: Types::JourneySessionType

    # == Callback Handlers
    sig do
      params(session: ::Journey::Session)
        .returns(T.nilable(::Journey::SessionParticipation))
    end
    def subscribe(session:) = nil
  end
end
