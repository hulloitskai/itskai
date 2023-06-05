# typed: strict
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
      cleanup_obsidian_stubs: {
        class: "CleanupObsidianStubJob",
        description: "Destroy unreferenced stubs from Obsidian.",
        cron: "15 */6 * * *",
      },
      analyze_obsidian_notes: {
        class: "AnalyzeObsidianNotesJob",
        description: "Analayze notes from Obsidian.",
        cron: "30 */6 * * *",
      },
      import_obsidian_notes: {
        class: "ImportObsidianNotesJob",
        description: "Import notes from Obsidian.",
        cron: "*/5 * * * *",
      },
      import_journal_entries: {
        class: "ImportJournalEntriesJob",
        description: "Import journal entries from Notion.",
        cron: "*/5 * * * *",
      },
    }

    # == Errors
    config.retry_on_unhandled_error = false
    config.on_thread_error = ->(error) do
      Rails.error.report(error, handled: false)
    end
  end
end
