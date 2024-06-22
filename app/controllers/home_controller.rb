# typed: true
# frozen_string_literal: true

class HomeController < ApplicationController
  # == Actions
  def show
    if request.hostname == "cathy.earth"
      CathendantsController.dispatch(:show, request, response)
    else
      specified_journal_entry = if (id = home_params.entry_id)
        JournalEntry.with_content.find(id)
      end
      first_journal_entry = JournalEntry.with_content.ordered.first
      render(inertia: "HomePage", props: {
        announcement: Announcement.current,
        explorations: ExplorationSerializer.many(Exploration.all),
        "approximateLocation" => ApproximateLocationSerializer
          .one_if(LocationLog.latest_visible),
        "journalEntry" => JournalEntrySerializer
          .one_if(specified_journal_entry || first_journal_entry),
        "firstJournalEntryId" => first_journal_entry&.id,
        "journalAutoscroll" => specified_journal_entry.present?,
      })
    end
  end

  private

  # == Helpers
  sig { returns(HomeParams) }
  def home_params
    @home_params ||= HomeParams.new(params.permit(*HomeParams.attribute_names))
  end
end
