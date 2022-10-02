# typed: strict
# frozen_string_literal: true

Rails.application.configure do
  config.good_job.tap do |config|
    config.poll_interval = ENV.fetch("GOOD_JOB_POLL_INTERVAL", "30").to_i
    config.max_threads = ENV.fetch("GOOD_JOB_MAX_THREADS", "2").to_i

    # == Cron ==
    config.enable_cron = true
    config.cron = {
      cleanup_storage: {
        class: "CleanupStorageJob",
        description: "Schedule purging of unattached ActiveStorage blobs.",
        cron: "0 0-23/6 * * *",
      },
      trigger_test_subscriptions: {
        class: "TriggerTestSubscriptionsJob",
        description:
          "Triggers an update for all subscriptions to `testSubscription' " \
            "field.",
        cron: "*/2 * * * * *",
      },
    }

    # == Errors ==
    config.retry_on_unhandled_error = false
    config.on_thread_error = ->(error) { Honeybadger.notify(error) }
  end
end
