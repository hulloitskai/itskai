# typed: strict
# frozen_string_literal: true

class TriggerTestSubscriptionsJob < ApplicationJob
  extend T::Sig

  sig { void }
  def perform
    Schema.subscriptions.trigger(:test_subscription, {}, nil)
  end
end
