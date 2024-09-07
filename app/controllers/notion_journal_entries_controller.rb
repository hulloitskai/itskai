# typed: true
# frozen_string_literal: true

class NotionJournalEntriesController < ApplicationController
  # == Filters
  before_action :set_entry, only: :comments

  # == Actions
  # GET /notion_journal_entries/:id/comments
  def comments
    entry = @entry or raise "Missing entry"
    comments = entry.notion_comments
    render(json: {
      comments: NotionCommentSerializer.many(comments),
    })
  end

  private

  # == Filter handlers
  sig { void }
  def set_entry
    @entry = T.let(
      NotionJournalEntry.find(params.fetch(:id)),
      T.nilable(NotionJournalEntry),
    )
  end
end
