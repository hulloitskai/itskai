# typed: true
# frozen_string_literal: true

class HomeController < ApplicationController
  # == Actions
  # GET /
  def show
    if request.hostname == "cathy.earth"
      Cathendant::HomeController.dispatch(:show, request, response)
    else
      specified_journal_entry = if (id = home_params.entry_id)
        NotionJournalEntry.with_content.find(id)
      end
      first_journal_entry = NotionJournalEntry.with_content.ordered.first
      render(inertia: "HomePage", props: {
        announcement: Announcement.current,
        explorations: ExplorationSerializer.many(Exploration.all),
        "approximateLocation" => ApproximateLocationSerializer
          .one_if(LocationLog.latest_visible),
        "journalEntry" => NotionJournalEntrySerializer
          .one_if(specified_journal_entry || first_journal_entry),
        "firstJournalEntryId" => first_journal_entry&.id,
        "journalAutoscroll" => specified_journal_entry.present?,
      },)
    end
  end

  # GET /feed.atom
  def feed
    @entries = NotionJournalEntry.reverse_chronological
  end

  private

  # == Helpers
  sig { returns(HomeParameters) }
  def home_params
    @home_params ||= HomeParameters.new(params)
  end
end
