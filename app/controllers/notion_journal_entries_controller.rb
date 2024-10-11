# typed: true
# frozen_string_literal: true

class NotionJournalEntriesController < ApplicationController
  # == Actions
  # GET /notion_journal_entries/:id/comments
  def comments
    entry = NotionJournalEntry.find(params.fetch(:id))
    comments = entry.notion_comments
    render(json: {
      comments: NotionCommentSerializer.many(comments),
    })
  end
end
