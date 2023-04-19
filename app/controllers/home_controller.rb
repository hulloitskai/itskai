# typed: true
# frozen_string_literal: true

class HomeController < ApplicationController
  # == Actions
  def show
    journal_entries_start_cusor = params["entry"]&.to_s
    render(
      inertia: "HomePage",
      props: { journal_entries_start_cusor: },
    )
  end
end
