# typed: strict
# frozen_string_literal: true

module ActivityStatus
  extend T::Sig

  # == Constants
  CACHE_KEY = T.let(%i[activity_status], T.anything)
  DURATION = T.let(3.seconds, ActiveSupport::Duration)

  # == Current
  sig { returns(T.nilable(String)) }
  def self.current
    Rails.cache.read(CACHE_KEY)
  end

  sig { params(status: String).void }
  def self.current=(status)
    Rails.cache.write(CACHE_KEY, status, expires_in: DURATION)
    ClearActivityStatusJob.set(wait: DURATION).perform_later
    trigger_subscriptions(status)
  end

  sig { void }
  def self.clear
    trigger_subscriptions(nil) if current.nil?
  end

  sig { params(status: T.nilable(String)).void }
  private_class_method def self.trigger_subscriptions(status)
    Schema.subscriptions!.trigger(:activity_status, {}, status)
  end
end
