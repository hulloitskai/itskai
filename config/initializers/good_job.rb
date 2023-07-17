# typed: true
# frozen_string_literal: true

Rails.application.configure do
  config.good_job.tap do |config|
    config.poll_interval = ENV.fetch("GOOD_JOB_POLL_INTERVAL", 30).to_i
    config.max_threads = ENV.fetch("GOOD_JOB_MAX_THREADS", 2).to_i

    # == Cron
    config.enable_cron = true
    config.cron = {
      "active_storage/cleanup_blobs": {
        class: "ActiveStorage::CleanupBlobsJob",
        description: "Schedule purging of unattached ActiveStorage blobs.",
        cron: "0 */6 * * *",
      },
      sync_journal: {
        class: "SyncJournalJob",
        cron: "*/5 * * * *",
      },
      sync_location: {
        class: "SyncLocationJob",
        cron: "3-59/5 * * * *",
      },
    }

    # == Errors
    config.retry_on_unhandled_error = false
    config.on_thread_error = ->(error) do
      error = T.let(error, Exception)
      Rails.error.report(error, handled: false)
    end
  end
end
