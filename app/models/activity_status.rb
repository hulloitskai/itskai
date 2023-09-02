# typed: strict
# frozen_string_literal: true

module ActivityStatus
  class << self
    extend T::Sig

    # == Current
    sig { returns(T.nilable(String)) }
    def current
      Rails.cache.read(current_key)
    end

    sig { params(status: String).void }
    def current=(status)
      Rails.cache.write(current_key, status, expires_in: duration)
      ClearActivityStatusJob.set(wait: duration).perform_later
      trigger_subscriptions(status)
    end

    sig { void }
    def clear
      trigger_subscriptions(nil) if current.nil?
    end

    private

    # == Helpers
    sig { returns(T.anything) }
    def current_key
      %i[activity_status current]
    end

    sig { returns(ActiveSupport::Duration) }
    def duration
      3.seconds
    end

    sig { params(status: T.nilable(String)).void }
    def trigger_subscriptions(status)
      Schema.subscriptions!.trigger(:activity_status, {}, status)
    end
  end
end
