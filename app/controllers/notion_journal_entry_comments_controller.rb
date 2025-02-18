# typed: true
# frozen_string_literal: true

class NotionJournalEntryCommentsController < ApplicationController
  # == Actions
  # GET /notion_journal_entries/:entry_id/comments
  def index
    entry = NotionJournalEntry.find(params.fetch(:entry_id))
    comments = entry.notion_comments
    render(json: {
      comments: NotionCommentSerializer.many(comments),
    })
  end

  # POST /notion_journal_entries/:entry_id/comments
  def create
    entry = NotionJournalEntry.find(params.fetch(:entry_id))
    text = params.dig(:comment, :text).presence or raise "Missing comment text"
    entry.create_notion_comment(text)
    render(json: {}, status: :created)
  end
end
