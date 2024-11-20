# typed: true
# frozen_string_literal: true

class HomeController < ApplicationController
  # == Actions
  # GET /
  def show
    if request.hostname == "cathy.earth"
      Cathendant::HomeController.dispatch(:show, request, response)
    else
      home_params = HomeParameters.new(params)
      home_params.validate!
      explorations = authorized_scope(Exploration.all, with: ExplorationPolicy)
      specified_journal_entry = if (id = home_params.journal_entry_id)
        NotionJournalEntry.with_content.find(id)
      end
      first_journal_entry = NotionJournalEntry.with_content.ordered.first
      render(inertia: "HomePage", props: {
        announcement: Announcement.current,
        explorations: ExplorationSerializer.many(explorations),
        "approximateLocation" => ApproximateLocationSerializer
          .one_if(LocationLog.latest_visible),
        "journalEntry" => NotionJournalEntrySerializer
          .one_if(specified_journal_entry || first_journal_entry),
        "journalEntryPermalinked" => specified_journal_entry.present?,
        "firstJournalEntryId" => first_journal_entry&.id,
      })
    end
  end

  # GET /feed.atom
  def feed
    @entries = NotionJournalEntry.reverse_chronological
  end
end
