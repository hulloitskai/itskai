# typed: true
# frozen_string_literal: true

class HomeController < ApplicationController
  # == Actions
  # GET /
  def show
    render(inertia: "HomePage", props: {
      announcement: Announcement.current,
    })
  end
end
