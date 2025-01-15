# typed: true
# frozen_string_literal: true

class PushSubscriptionsController < ApplicationController
  # == Filters
  before_action :authenticate_friend_or_user!, except: :lookup

  # == Actions
  # POST /push_subscriptions/lookup
  def lookup
    subscription_params = params.require(:push_subscription).permit(:endpoint)
    registration = PushSubscription.find_by(subscription_params)
    render(json: {
      registration: PushSubscriptionRegistrationSerializer.one_if(registration),
    })
  end

  # POST /push_subscriptions
  def create
    authorize!(with: PushSubscriptionPolicy)
    subscription_params = params.require(:push_subscription)
      .permit(:endpoint, :p256dh_key, :auth_key)
    endpoint = subscription_params.delete(:endpoint)
    subscription = PushSubscription.find_or_initialize_by(endpoint:)
    subscription.update!(friend: current_friend, **subscription_params)
    render(json: {})
  end

  # PUT /push_subscriptions/unsubscribe
  def unsubscribe
    subscription_params = params.require(:push_subscription).permit(:endpoint)
    PushSubscription.destroy_by(subscription_params)
    render(json: {})
  end

  # POST /push_subscriptions/change
  def change
    old_subscription_params = params.require(:old_subscription)
      .permit(:endpoint)
    new_subscription_params = params.require(:new_subscription)
      .permit(:endpoint, :p256dh_key, :auth_key)
    subscription = PushSubscription.find_by!(old_subscription_params)
    subscription.update!(new_subscription_params)
    render(json: {})
  end

  # POST /push_subscriptions/test
  def test
    subscription_params = params.require(:push_subscription)
      .permit(:endpoint)
    subscription = PushSubscription.find_by!(subscription_params)
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
