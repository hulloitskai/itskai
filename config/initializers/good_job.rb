# typed: strict
# frozen_string_literal: true

Rails.application.configure do
  config.good_job.tap do |config|
    config.smaller_number_is_higher_priority = true
    config.poll_interval = ENV.fetch("GOOD_JOB_POLL_INTERVAL", 30).to_i
    config.max_threads = ENV.fetch("GOOD_JOB_MAX_THREADS", 2).to_i
    config.queue_select_limit =
      ENV.fetch("GOOD_JOB_QUEUE_SELECT_LIMIT", 1000).to_i

    # == Cron Jobs
    config.enable_cron = true
    config.cron = {
      "active_storage/cleanup_blobs": {
        class: "ActiveStorage::CleanupBlobsJob",
        description: "Schedule purging of unattached ActiveStorage blobs.",
        cron: "0 */6 * * *",
      },
    }

    # == Errors
    config.retry_on_unhandled_error = false
    config.on_thread_error = ->(error) do
      error = T.let(error, Exception)
      Rails.error.report(error, handled: false)
    end
  end

  if Rails.server?
    config.after_initialize do
      config.good_job.tap do |config|
        config.cron[:sync_location_logs] = {
          class: SyncLocationLogsJob.name,
          cron: "* * * * *",
        } if SyncLocationLogsJob.enabled?
        config.cron[:sync_journal_entry] = {
          class: SyncJournalEntryJob.name,
          cron: "*/5 * * * *",
        } if SyncJournalEntriesJob.enabled?
      end
    end
  end
end
