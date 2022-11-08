# typed: strict
# frozen_string_literal: true

module Types
  class SubscriptionType < Types::BaseObject
    field :currently_playing, subscription: Subscriptions::CurrentlyPlaying
    field :test_subscription, subscription: Subscriptions::TestSubscription
  end
end
