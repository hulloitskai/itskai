# typed: strict
# frozen_string_literal: true

module Types
  class SubscriptionType < BaseObject
    # == Subscriptions
    field :activity_status, subscription: Subscriptions::ActivityStatus
    field :currently_playing, subscription: Subscriptions::CurrentlyPlaying
    field :journey_session_participation,
          subscription: Subscriptions::JourneySessionParticipation
    field :location, subscription: Subscriptions::Location
    field :pensieve_message, subscription: Subscriptions::PensieveMessage
    field :test_subscription, subscription: Subscriptions::TestSubscription
  end
end
