# typed: true
# frozen_string_literal: true

class NotionJournalEntrySyncResultsSerializer < ApplicationSerializer
  # == Configuration
  object_as :sync_results, model: "NotionJournalEntrySyncResults"

  # == Attributes
  attributes added: { type: :number },
             updated: { type: :number },
             removed: { type: :number }
end
