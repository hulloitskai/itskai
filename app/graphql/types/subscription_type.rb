# typed: true
# frozen_string_literal: true

module Types
  class SubscriptionType < BaseObject
    field :activity_status, subscription: Subscriptions::ActivityStatus
    field :currently_playing, subscription: Subscriptions::CurrentlyPlaying
    field :test_subscription, subscription: Subscriptions::TestSubscription
  end
end
