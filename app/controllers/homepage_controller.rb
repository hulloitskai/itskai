# typed: true
# frozen_string_literal: true

class HomepageController < ApplicationController
  # == Actions
  def show
    entry_id = params["entryId"]&.to_s
    Thread.new do
      Rails.error.handle do
        status = if entry_id.present?
          entry = JournalService.retrieve_entry(entry_id:)
          title = entry.properties["Name"].title.first!.plain_text
          "Someone is reading: #{title}"
        else
          "Someone landed on the homepage!"
        end
        ActivityService.update_status(status)
      end
    end
    render(inertia: "HomePage", props: { entry_id: })
  end
end
