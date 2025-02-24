# typed: strict
# frozen_string_literal: true

Rails.application.configure do
  config.good_job.tap do |config|
    config.smaller_number_is_higher_priority = true
    config.max_threads = ENV.fetch("GOOD_JOB_MAX_THREADS", 2).to_i

    # == Cron jobs
    config.enable_cron = true
    config.cron = {
      "active_storage/cleanup_blobs": {
        class: "ActiveStorage::CleanupBlobsJob",
        description: "Schedule purging of unattached ActiveStorage blobs.",
        cron: "0 */6 * * *",
      },
      "sync_notion_journal_entries": {
        class: "SyncNotionJournalEntriesJob",
        cron: "*/5 * * * *",
      },
    }
    unless Location.sync_disabled?
      config.cron["sync_location_logs"] = {
        class: "SyncLocationLogsJob",
        cron: "* * * * *",
      }
    end

    # == Errors
    config.retry_on_unhandled_error = false
    config.on_thread_error = ->(error) do
      error = T.let(error, Exception)
      Rails.logger.error("Good Job thread error: #{error}")
      Rails.error.report(error, handled: false)
      Sentry.capture_exception(error)
    end
  end
end

ActiveSupport.on_load(:good_job_application_controller) do
  include RemembersUserLocation
  include AdminsOnly unless Rails.env.development?
end
