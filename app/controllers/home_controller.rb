# typed: true
# frozen_string_literal: true

class HomeController < ApplicationController
  # == Actions
  def show
    entries_start_cursor = params["entry"]&.to_s
    render(
      inertia: "HomePage",
      props: { entries_start_cursor: },
    )
  end
end
