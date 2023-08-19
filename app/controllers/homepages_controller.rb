# typed: true
# frozen_string_literal: true

class HomepagesController < ApplicationController
  # == Filters
  before_action :set_journal_entry

  # == Actions
  def show
    ActivityStatus.current = "Someone landed on the homepage!"
    journal_entry_id = @journal_entry&.to_gid&.to_s
    data = query!("HomePageQuery", {
      journal_entry_id: journal_entry_id || "",
      show_journal_entry: journal_entry_id.present?,
    })
    render(inertia: "HomePage", props: {
      data:,
      first_journal_entry_id: first_journal_entry&.to_gid&.to_s,
    })
  end

  private

  # == Helpers
  sig { returns(T.nilable(JournalEntry)) }
  def first_journal_entry
    JournalEntry.with_content.order(started_at: :desc).first
  end

  # == Filter Handlers
  def set_journal_entry
    @journal_entry = T.let(@entry, T.nilable(JournalEntry))
    @journal_entry = if (id = params["entryId"])
      JournalEntry.find(id.to_s)
    else
      first_journal_entry
    end
  end
end
