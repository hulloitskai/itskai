# typed: true
# frozen_string_literal: true

class PushSubscriptionPolicy < ApplicationPolicy
  # == Rules
  def create?
    friend.present?
  end

  def test?
    subscription = T.cast(record, PushSubscription)
    subscription.friend == friend
  end
end
