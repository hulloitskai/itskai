# typed: true
# frozen_string_literal: true

class PushSubscriptionRegistrationSerializer < ApplicationSerializer
  # == Configuration
  object_as :subscription, model: "PushSubscription"

  # == Attributes
  identifier
end
