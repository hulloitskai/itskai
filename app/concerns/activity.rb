# typed: true
# frozen_string_literal: true

module Activity
  class << self
    extend T::Sig

    # == Methods
    sig { returns(T.nilable(String)) }
    def status
      Rails.cache.read(status_key)
    end

    sig { params(status: String).void }
    def status=(status)
      Rails.cache.write(status_key, status, expires_in: status_duration)
      ClearStatusJob.set(wait: status_duration).perform_later
      trigger_status_subscriptions(status)
    end

    sig { void }
    def clear_status
      trigger_status_subscriptions(nil) if status.nil?
    end

    private

    # == Helpers
    sig { returns(T.anything) }
    def status_key
      %i[activity status]
    end

    sig { returns(ActiveSupport::Duration) }
    def status_duration
      3.seconds
    end

    sig { params(status: T.nilable(String)).void }
    def trigger_status_subscriptions(status)
      Schema.subscriptions!.trigger(:activity_status, {}, status)
    end
  end
end
