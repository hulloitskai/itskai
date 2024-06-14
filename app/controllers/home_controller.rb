# typed: true
# frozen_string_literal: true

require "announcement"

class HomeController < ApplicationController
  # == Actions
  def show
    specified_journal_entry = if (id = home_params.entry_id)
      JournalEntry.with_content.find(id)
    end
    first_journal_entry = JournalEntry.with_content.ordered.first
    render(inertia: "HomePage", props: {
      autoscroll: specified_journal_entry.present?,
      announcement: Announcement.current,
      explorations: ExplorationSerializer.many(Exploration.all),
      "approximateLocation" => ApproximateLocationSerializer
        .one_if(LocationLog.latest_visible),
      "journalEntry" => JournalEntrySerializer
        .one_if(specified_journal_entry || first_journal_entry),
      "firstJournalEntryId" => first_journal_entry&.id,
    })
  end

  private

  # == Helpers
  sig { returns(HomeParams) }
  def home_params
    @home_params ||= HomeParams.new(params.permit(*HomeParams.attribute_names))
  end
end
