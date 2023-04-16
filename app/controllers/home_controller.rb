# typed: true
# frozen_string_literal: true

class HomeController < ApplicationController
  # == Actions
  def show
    writings_start_cursor = params["entry"]&.to_s
    render(
      inertia: "HomePage",
      props: { writings_start_cursor: },
    )
  end
end
