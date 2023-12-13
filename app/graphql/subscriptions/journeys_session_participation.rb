# typed: strict
# frozen_string_literal: true

module Subscriptions
  class JourneysSessionParticipation < BaseSubscription
    # == Configuration
    broadcastable false

    # == Type
    type Types::JourneysSessionParticipationType, null: true

    # == Arguments
    argument :session_id, ID, loads: Types::JourneysSessionType

    # == Callback Handlers
    sig do
      params(session: ::Journeys::Session)
        .returns(T.nilable(::Journeys::SessionParticipation))
    end
    def subscribe(session:) = nil
  end
end
