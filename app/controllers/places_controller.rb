# typed: true
# frozen_string_literal: true

class PlacesController < ApplicationController
  # == Actions
  def toronto
    redirect_to_notion_page("c83f5ba7a1f242ee8d75706b1e2269f2")
  end

  private

  # == Helpers
  sig { params(page_id: String).void }
  def redirect_to_notion_page(page_id)
    url = "https://www.notion.so/itskai/#{page_id}"
    redirect_to(url, allow_other_host: true)
  end
end
