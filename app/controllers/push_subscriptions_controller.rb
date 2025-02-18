# typed: true
# frozen_string_literal: true

class PushSubscriptionsController < ApplicationController
  # == Filters
  before_action :authenticate_friend_or_user!, except: :lookup

  # == Actions
  # POST /push_subscriptions/lookup
  def lookup
    endpoint = T.let(params.dig(:push_subscription, :endpoint), String)
    registration = PushSubscription.find_by(endpoint:)
    render(json: {
      registration: PushSubscriptionRegistrationSerializer.one_if(registration),
    })
  end

  # POST /push_subscriptions
  def create
    authorize!(with: PushSubscriptionPolicy)
    subscription_params = params.expect(push_subscription: %i[
      endpoint
      p256dh_key
      auth_key
    ])
    endpoint = T.let(subscription_params.delete(:endpoint), String)
    subscription = PushSubscription.find_or_initialize_by(endpoint:)
    subscription.update!(friend: current_friend, **subscription_params)
    render(json: {})
  end

  # PUT /push_subscriptions/unsubscribe
  def unsubscribe
    endpoint = T.let(params.dig(:push_subscription, :endpoint), String)
    PushSubscription.destroy_by(endpoint:)
    render(json: {})
  end

  # POST /push_subscriptions/change
  def change
    endpoint = T.let(params.dig(:old_subscription, :endpoint), String)
    new_subscription_params = params.expect(new_subscription: %i[
      endpoint
      p256dh_key
      auth_key
    ])
    subscription = PushSubscription.find_by!(endpoint:)
    subscription.update!(new_subscription_params)
    render(json: {})
  end

  # POST /push_subscriptions/test
  def test
    endpoint = T.let(params.dig(:push_subscription, :endpoint), String)
    subscription = PushSubscription.find_by!(endpoint:)
    authorize!(subscription)
    subscription.send_test_notification
    render(json: {})
  end

  # GET /push_subscriptions/public_key
  def public_key
    public_key = Rails.application.credentials.web_push!.public_key!
    render(json: {
      "publicKey" => encode_public_key(public_key),
    })
  end

  private

  # == Helpers
  # See: https://fly.io/ruby-dispatch/push-to-subscribe/#user-interface
  sig { params(public_key: String).returns(String) }
  def encode_public_key(public_key)
    public_key.tr("_-", "/+")
  end
end
