# typed: true
# frozen_string_literal: true

module Admin
  class NotionJournalEntriesController < AdminController
    # == Actions
    # POST /admin/notion_journal_entries/sync
    def sync
      results = NotionJournalEntry.sync
      render(json: {
        "syncResults" => NotionJournalEntrySyncResultsSerializer.one(results),
      })
    end
  end
end
