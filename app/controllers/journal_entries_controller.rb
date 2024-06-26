# typed: true
# frozen_string_literal: true

class JournalEntriesController < ApplicationController
  # == Filters
  before_action :set_entry, only: :comments

  # == Actions
  # GET /journal_entries/:id/comments
  def comments
    raise "Missing entry" unless @entry
    comments = @entry.notion_comments
    render(json: {
      comments: NotionCommentSerializer.many(comments),
    })
  end

  private

  # == Filter handlers
  sig { void }
  def set_entry
    @entry = T.let(
      JournalEntry.find(params.fetch(:id)),
      T.nilable(JournalEntry),
    )
  end
end
